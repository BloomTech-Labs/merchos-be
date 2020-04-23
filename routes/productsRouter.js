const router = require('express').Router();

const Products = require("../models/productsModel");

module.exports = router;
// GET STORE PRODUCTS

router.get('/', (req, res) => {
    const { store_id } = req.body;

    Products.findByStoreId(store_id)
        .then((products) => {
            res.status(200).json(products);
        }).catch((err) => {
            res.status(500).json({ message: "an error has occurred with finding products please try again." })
        });

})


router.get('/:product_id', (req, res) => {
    const { product_id } = req.params;

    Products.findById(product_id)
        .then((product) => {
            if(product){
                res.status(200).json(product);
            }else{
                res.status(400).json({message:"sorry no product by that id"});
            }
        }).catch((err) => {
            res.status(500).json({ message: "an error has occurred with finding the product please try again." })
        });

})

router.delete('/:product_id', (req, res) => {
    const { product_id } = req.params;

    Products.remove(product_id)
        .then(() => {
            res.status(200).json({message:'product removed successfully'});
        }).catch((err) => {
            res.status(500).json({ message: "an error has occurred with deleting the product please try again." })
        });

})


// DELETE PRODUCT
