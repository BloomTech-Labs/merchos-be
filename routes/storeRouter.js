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
router.get('/:name', (req, res) => {
  Store.findBy(req.params.name)
    .then(store => {
      store.name === req.params.name
        ? res.status(200).json(store)
        : res
            .status(404)
            .json({ message: 'There is no store by this name available' });
    })
    .catch(err => res.status(500).json(err));
});

// @ROUTE       POST /store
// @DESC        POST create A store
router.post('/', async (req, res) => {
  const store = { ...req.body };
  try {
    const storeData = await Store.add(store);
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
router.delete('/:id', (req, res) => {
  Store.remove(req.params.id)
    .then(removed => {
      removed
        ? res
            .status(202)
            .json({
              removed_shop_id: req.params.id,
              message: 'Store Has Been Deleted'
            })
        : res
            .send(404)
            .json({ message: `Could not find store with ID ${req.params.id}` });
    })
    .catch(error => res.status(500).json(error));
});
