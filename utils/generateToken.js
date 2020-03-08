const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

module.exports = generateToken;

function generateToken(res, user, rememberBox = false) {
  // set constant of one hour
  const oneHour = 3600000;
  // set constant of thirty days
  const thirtyDays = 2592 * 1000000;

  // if 'remember me' is true, expiration will be 30 Days, otherwise 1 hour
  const expiration = rememberBox === true ? thirtyDays : oneHour;

  // set expiration time for cookie. Dev environment will autoreceive one hour, otherise, expiration above
  const cookieExpiration =
    process.env.NODE_ENV === 'development' ? oneHour : expiration;
  // payload will include the user id
  const payload = {
    userID: user.id
  };

  // jwt options
  const options = {
    // we'll set the token expiration to the expiration provided above / 1000 milliseconds
    expiresIn: expiration / 1000
  };

  // return a token, passing in payload, secret, and options
  const token = jwt.sign(payload, secret, options);
  const secure = process.env.NODE_ENV === 'development' ? false : true;

  // respond with a cookie, calling it token, and passing in the token
  return res.cookie('token', token, {
    expires: new Date(Date.now() + cookieExpiration),
    secure: secure, // needs to be true for https
    httpOnly: true
  });
}
