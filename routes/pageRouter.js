const router = require('express').Router();

// jwtVerify
const jwtVerify = require('../utils/verifyToken');

// models
const Pages = require('../models/pageModel');

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

// @ROUTE       PUT /page/:someparam
// @DESC        Updates a page
// @AUTH        Private (Will require auth middleware)
// REQ schema
/**
 *  {
 *     theme: '',
 *     layout: '',
 *     color: ''
 *  }
 */
router.put('/:id', jwtVerify, async (req, res) => {
  // pull userID from cookie
  const { userID } = req.user;
  // pull id from params
  const { id } = req.params;
  try {
    // verify page belongs to a user with their user ID
    const verifyPage = await Pages.verifyPage(userID, id);
    // if page verification returns false, reject
    if (verifyPage === false) {
      res
        .status(404)
        .json({ message: "This page doesn't exist for this user" });
    }

    // otherwise, await for response if item was updated with body and id
    const updated = await Pages.updatePage(id, req.body);
    // if updated returns 0 - reject
    if (updated == 0) {
      res.status(404).json({ message: "Page doesn't exist" });
    }

    // otherwise, search for the page using the same ID
    const page = await Pages.findBy({ id });
    // and respond with the new information
    res.status(201).json(page);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
