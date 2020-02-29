const router = require('express').Router();

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
router.get('/:name', async (req, res) => {
  // pull name from req.params
  const { name } = req.params;
  // following the db naming, set to lowercase convention
  const store_name = name.toLowerCase();
  try {
    // await store reponse by finding by the column name
    const store = await Store.findBy({ store_name });

    // if nothing is returned, reject
    if (!store) {
      res.status(404).json({ message: 'This store does not exist' });
    }

    // respond with the store data
    res.status(200).json({
      store
    });
  } catch (err) {
    console.log(err);
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
 *        store_name: 'storename',
 *        store_url: 'storeurl'
 *      },
 *    page: {
 *        theme: '',
 *        layout: '',
 *        color: ''
 *      }
 * }
 */
router.post('/', async (req, res) => {
  // pull store
  const { store } = req.body;
  // pull store_name and store_url from store
  const { store_name, store_url } = store;

  // check if those parameters exist, if not - reject
  if (!store_name && !store_url) {
    res
      .status(400)
      .json({ message: 'Both store name and store url are required' });
  }

  // for casing standards, set store_name to lowercase
  req.body.store.store_name = store_name.toLowerCase();
  // do the same with store_url
  req.body.store.store_url = store_url.toLowerCase();

  // if req.body.page doesn't exist, create an empty object
  if (!req.body.page) {
    req.body.page = {
      theme: '',
      layout: '',
      color: ''
    };
  }

  // pull page from req.body
  const { page } = req.body;

  try {
    // await the return of adding the store to the db
    const storeData = await Store.add(store);
    // await the return of adding the page obj to db
    const pageData = await Pages.addPage(page);
    // add to associative table
    const storePageData = await StorePages.addStorePage(storeData, pageData);
    // return joined data
    const storePage = await StorePages.findStorePage(storePageData.id);

    // construct a new object
    const data = {
      store: {
        store_id: storePage.store_id,
        info: {
          store_name: storePage.store_name,
          store_url: storePage.store_url
        }
      },
      page: {
        page_id: storePage.page_id,
        info: {
          theme: storePage.theme,
          layout: storePage.layout,
          color: storePage.color
        }
      }
    };
    // and respond with data
    res.status(201).json({ message: 'Your store has been created.', data });
  } catch (error) {
    res.status(500).json(error);
    console.log('ERROR DURNING STORE CREATION', error);
  }
});

// @ROUTE       PUT /store/:name
// @DESC        update a store
// @AUTH        Private (Will require auth middleware)
router.put('/:name', async (req, res) => {
  // pull name from req.params
  const { name } = req.params;
  // following the db naming, set to lowercase convention
  const store_name = name.toLowerCase();

  // spread the req.body into out store variable
  const store = { ...req.body };
  try {
    // await response from db on the update, passing in filter and store info
    const storeData = await Store.updateStore({ store_name }, store);

    // check if the response is undefined, if yes, reject
    if (!storeData[0]) {
      res.status(404).json({ message: 'Store was not found' });
    }
    // if not, respond with the new store data
    res.status(201).json(storeData[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// @ROUTE       DELETE /store/:name
// @DESC        DELETE a store
// @AUTH        Private (Will require auth middleware)
router.delete('/:name', (req, res) => {
  // pull name from req.params
  const { name } = req.params;
  // following the db naming, set to lowercase convention
  const store_name = name.toLowerCase();
  Store.remove({ store_name })
    .then(removed => {
      removed
        ? res.status(202).json({
            removed_shop_id: req.params.id,
            message: 'Store Has Been Deleted'
          })
        : res
            .send(404)
            .json({ message: `Could not find store with ID ${req.params.id}` });
    })
    .catch(error => res.status(500).json(error));
});
