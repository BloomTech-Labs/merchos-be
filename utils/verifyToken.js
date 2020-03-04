const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

module.exports = (req, res, next) => {
  const token = req.cookies.token || '';

  try {
    if (!token) {
      res.status(401).json('You must be logged in');
    }

    const decrypt = jwt.verify(token, secret);
    req.user = {
      userID: decrypt.userID
    };
    console.log('userID', req.user);
    next();
  } catch (err) {
    res.status(500).json(err.toString());
  }
};
