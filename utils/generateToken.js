const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

module.exports = generateToken;

function generateToken(res, user) {
  // set expiration time for cookie
  const cookieExpiration =
    process.env.NODE_ENV === 'development' ? 3600000 : 600000;
  // payload will include the user id
  const payload = {
    userID: user.id
  };

  // jwt options
  const options = {
    // we'll set the token expiration to 1 hour
    // later needs to be modified to take in remember prop
    expiresIn: '1h'
  };

  // return a token, passing in payload, secret, and options
  const token = jwt.sign(payload, secret, options);
  return res.cookie('token', token, {
    expires: new Date(Date.now() + cookieExpiration),
    secure: false, // needs to be true for https
    httpOnly: true
  });
}
