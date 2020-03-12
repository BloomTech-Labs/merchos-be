const router = require('express').Router();

// Models
const User = require('../models/userModel');
const Store = require('../models/storeModel');

// jwtVerify
const jwtVerify = require('../utils/verifyToken');

// @ROUTE       GET /user/stores
// @DESC        Returns a specific user store based on JWT
// @AUTH        Private
router.get('/stores', jwtVerify, async (req, res) => {
  try {
    const userStores = await Store.returnUserStores(req.user.userID);

    res.status(200).json(userStores);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Admin routes
// require authorization
router.get('/', (req, res) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log('does this show');
      res.status(500).json({ message: 'I done goofed' });
    });
});

router.post('/roles', (req, res) => {
  const role = req.body;

  User.addRole(role)
    .then(role => res.status(201).json(role))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not set a role.' });
    });
});

router.get('/roles', (req, res) => {
  User.findAllRoles()
    .then(role => res.status(200).json(role))
    .catch(err =>
      res.status(500).json({ message: 'Could not find this role' })
    );
});

module.exports = router;
