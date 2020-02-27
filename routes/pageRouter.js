const router = require('express').Router();

module.export = router;

// @ROUTE       GET /page
// @DESC        gets all pages
// @AUTH        Private (Will require auth middleware for admin role)

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
