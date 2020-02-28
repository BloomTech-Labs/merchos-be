const router = require('express').Router();

// models
const Pages = require('../models/pageModel');
const StorePages = require('../models/storePageModel');

module.exports = router;

// @ROUTE       GET /page
// @DESC        gets all pages
// @AUTH        Private (Will require auth middleware for admin role)
router.get('/', async (req, res) => {
  try {
    const page = await Pages.getPages();

    res.status(200).json(page);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// @ROUTE       GET /page/:someparam
// @DESC        gets specific page data using a param
// @AUTH        Public

// @ROUTE       POST /page
// @DESC        creates a new page
// @AUTH        Private (Will require auth middleware for admin role)

// @ROUTE       PUT /page/:someparam
// @DESC        Updates a page
// @AUTH        Private (Will require auth middleware for admin role)

// @ROUTE       DELETE /page/:someparam
// @DESC        deletes a page
// @AUTH        Private (Will require auth middleware for admin role)
