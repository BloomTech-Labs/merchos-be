const router = require('express').Router();
const bcrypt = require('bcryptjs');

module.exports = router;

// Models
const User = require('../models/userModel');

// generate JWT
const genToken = require('../utils/generateToken');

// @ROUTE       POST /auth/registration
// @DESC        Register a user as store owner (2)
// @AUTH        Public
router.post('/register', async (req, res) => {
  // pull username and password from req.body
  const { username, password } = req.body;
  // if the body doesn't contain a username or password - reject
  if (!username || !password) {
    res.status(400).json({ message: 'Username and Password required' });
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

// @ROUTE       POST /auth/login
// @DESC        Login a user
// @AUTH        Public
router.post('/login', (req, res) => {
  const { username, password, rememberBox } = req.body;

  // if the body doesn't contain a username or password - reject
  if (!username || !password) {
    res.status(400).json({ message: 'Username and Password required' });
  }

  User.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        genToken(res, user, rememberBox);
        res.status(200).json({ user: user.id });
      } else {
        res.status(401).json({ message: 'Invalid Username/Password' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Could not login' });
    });
});
