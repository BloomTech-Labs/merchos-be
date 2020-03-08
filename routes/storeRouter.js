const router = require('express').Router();

// jwtVerify
const jwtVerify = require('../utils/verifyToken');

// models
const Store = require('../models/storeModel');
const Pages = require('../models/pageModel');
const StorePages = require('../models/storePageModel');

module.exports = router;

// @ROUTE       GET /store
// @DESC        Route to GET all the stores
router.get('/', (req, res) => {
  Store.find()
    .then(store => res.status(200).json(store))
    .catch(
      err =>
        res.status(500).json(err) &&
        console.log('ERROR WHILE TRYING TO FIND ALL STORES')
    );
});

// @ROUTE       GET /store/:name
// @DESC        GET that store by the stores name
// @AUTH        Public
router.get('/:name', async (req, res) => {
  // pull name from req.params
  const { name } = req.params;
  // following the db naming, set to lowercase convention
  const store_url = await Store.constructURI(name);
  try {
    // await store reponse by finding by the column name
    const store = await Store.findBy({ store_url });
    // if nothing is returned, reject
    if (!store) {
      res.status(404).json({ message: 'This store does not exist' });
    }
    // await joined response from storePage table
    const storePage = await StorePages.findStorePage(store.id);
    // construct a new object using storePage data
    const data = StorePages.storePageObj(storePage);
    // respond with both store and page data
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json(err);
  }
});

// @ROUTE       POST /store
// @DESC        POST create a store (and associated page)
// @AUTH        Private (Will require auth middleware)
// REQ MODEL:
/**
 * {
 *    store: {
 *        store_name: 'storename'
 *      },
 *    page: { // optional
 *        theme: '',
 *        layout: '',
 *        color: ''
 *      }
 * }
 */
router.post('/', jwtVerify, async (req, res) => {
  // pull store
  const { store } = req.body;
  // pull store_name and store_url from store
  const { store_name, store_url } = store;

  // check if those parameters exist, if not - reject
  if (!store_name) {
    res.status(400).json({ message: 'Store name is required' });
  } else if (!store_url) {
    // construct a store_url based on store's name
    req.body.store.store_url = await Store.constructURI(store_name);
  }

  // if req.body.page doesn't exist, create an empty object
  if (!req.body.page) {
    req.body.page = { theme: '', layout: '', color: '' };
  }

  // pull page from req.body
  const { page } = req.body;

  try {
    // search db for active store_url
    const urlInUse = await Store.findBy({ store_url });
    // if there is, reject and ask for customer store_url field
    if (urlInUse) {
      res.status(400).json({ message: 'Please create a custom URL' });
    }
    // otherwise, await the return of adding the store to the db
    const storeData = await Store.add(store);
    // add user_store connection using ID from cookie and returned store id
    await Store.addUserStore(req.user.userID, storeData.id);
    // await the return of adding the page obj to db
    const pageData = await Pages.addPage(page);
    // add to associative table
    const storePageData = await StorePages.addStorePage(storeData, pageData);
    // return joined data
    const storePage = await StorePages.findStorePage(storePageData.id);
    // construct a new object
    const data = StorePages.storePageObj(storePage);
    // and respond with data
    res.status(201).json({ message: 'Your store has been created.', data });
  } catch (error) {
    res.status(500).json(error);
  }
});

// @ROUTE       PUT /store/:name
// @DESC        update a store
// @AUTH        Private
// @REQ SCHEMA
/**
 * {
 *    store: {
 *        store_name: 'storename',
 *        store_url: 'storeurl' // optional
 *      }
 * }
 */
router.put('/:name', jwtVerify, async (req, res) => {
  // pull userID from JWT Cookie
  const { userID } = req.user;
  // pull name from req.params
  const { name } = req.params;
  const store_url = name;
  // spread the req.body into out store variable
  const store = { ...req.body };
  try {
    // return stores this user owns
    const userStores = await Store.returnUserStores(userID);
    // filters above array with what is being requested
    const userStore = Store.checkStores(store_url, userStores);
    // if the store doesn't exist for this specific user, reject
    if (!userStore) {
      res.status(404).json({ message: 'Store does not exist for this user' });
    }
    // if store_url exists in req and that is different from the name param
    if (req.body.store_url && req.body.store_url !== name) {
      // check if in use
      const urlInUse = await Store.findBy({ store_url: req.body.store_url });
      // if true, reject
      if (urlInUse) {
        res.status(400).json({ message: 'Store url already in use' });
      }
    }
    // await response from db on the update, passing in filter and store info
    const storeData = await Store.updateStore({ store_url }, store);
    // check if the response is undefined, if yes, reject
    if (!storeData[0]) {
      res.status(404).json({ message: 'Store was not found' });
    }
    // if not, respond with the new store data
    res.status(201).json(storeData[0]);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// @ROUTE       DELETE /store/:name
// @DESC        DELETE a store
// @AUTH        Private (Will require auth middleware)
router.delete('/:name', jwtVerify, async (req, res) => {
  // pull userID from JWT Cookie
  const { userID } = req.user;
  // pull name from req.params
  const { name } = req.params;
  // following the db naming, construct URI
  const store_url = await Store.constructURI(name);
  try {
    // return stores this user owns
    const userStores = await Store.returnUserStores(userID);
    // filters above array with what is being requested
    const userStore = Store.checkStores(store_url, userStores);
    // if the store doesn't exist for this specific user, reject
    if (!userStore) {
      res.status(404).json({ message: 'Store does not exist for this user' });
    }
    // else, await store reponse by finding by the column name
    const store = await Store.findBy({ store_url });
    // await store deletion (also deletes page)
    await StorePages.deleteStore(store.id);
    // if successful, send message
    res.status(202).json({ message: 'Store has been deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
