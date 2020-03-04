const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// generate JWT
const genToken = require('../utils/generateToken');

// @ROUTE       POST /user/registration
// @DESC        Register a user as store owner (2)
// @AUTH        Public
router.post('/register', async (req, res) => {
  // pull username and password from req.body
  const { username, password } = req.body;
  // if the body doesn't contain a username or password - reject
  if (!username || !password) {
    res.status(404).json({ message: 'Username and Password required' });
  }

  // create new user object with the request, pass in default role id of 2
  const user = { ...req.body, role_id: 2 };
  // hash the user password
  const hash = bcrypt.hashSync(user.password, 10);
  // replace the password in our user object with the hashed pw
  user.password = hash;

  try {
    // await User helper to retun user data
    const userData = await User.add(user);
    // create a token using the userData object
    genToken(res, userData);

    // if all is successful, respond with user ID and token
    res.status(201).json({
      user: userData.id
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'There was a problem when creating the user.', err });
    console.log('ERROR WHILE TRYING TO REGISTER USER', err);
  }
});

// @ROUTE       POST /user/login
// @DESC        Login a user
// @AUTH        Private
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        genToken(res, user);
        res.status(200).json({ user: user.id });
      } else {
        console.log(user);
        res.status(401).json({ message: 'Invalid Username/Password' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not login' });
    });
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
    .catch(err => res.status(500).json({ message: 'Could not set a role.' }));
});

router.get('/roles', (req, res) => {
  User.findAllRoles()
    .then(role => res.status(200).json(role))
    .catch(err =>
      res.status(500).json({ message: 'Could not find this role' })
    );
});

module.exports = router;
