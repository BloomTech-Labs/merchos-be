const router = require('express').Router();
const Store = require('../models/storeModel');

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
// @DESC        POST create A store
// @AUTH        Private (Will require auth middleware)
router.post('/', async (req, res) => {
  // pull store_name and store_url from req.body
  const { store_name, store_url } = req.body;

  // check if those parameters exist, if not - reject
  if (!store_name && !store_url) {
    res
      .status(400)
      .json({ message: 'Both store name and store url are required' });
  }

  // for casing standards, set store_name to lowercase
  req.body.store_name = store_name.toLowerCase();
  // do the same with store_url
  req.body.store_url = store_url.toLowerCase();

  // now pass the req.body into a new store variable
  const store = { ...req.body };
  try {
    // await the return of adding the store to the db
    const storeData = await Store.add(store);
    // and respond with data
    res
      .status(201)
      .json({ message: 'Your store has been created.', storeData });
  } catch (error) {
    res.status(500).json(error);
    console.log('ERROR DURNING STORE CREATION', error);
  }
});

// @ROUTE       DELETE /store/:id
// @DESC        DELETE a store
// @AUTH        Private (Will require auth middleware)
router.delete('/:id', (req, res) => {
  Store.remove(req.params.id)
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
