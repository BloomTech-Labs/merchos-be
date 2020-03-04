const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

module.exports = generateToken;

function generateToken(user) {
  // payload will include the user id
  const payload = {
    userID: user.id
  };

  // jwt options
  const options = {
    // we'll set the token expiration to 1 hour
    expiresIn: '1h'
  };

  // return a token, passing in payload, secret, and options
  const token = jwt.sign(payload, secret, options);
  return token;
}
