const router = require('express').Router();
const Store = require('./storeModel');

module.exports = router;

// @ROUTE       GET /store
// @DESC        Route to GET all the stores
router.get('/', (req,res)=>{
    Store.find()
        .then(store => !store ? res.send(404) : res.send(200).json(store))
        .catch(err => res.status(500).json(err) && console.log('ERROR WHILE TRYING TO FIND ALL STORES'))
})

