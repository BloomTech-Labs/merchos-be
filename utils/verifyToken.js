const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

module.exports = async (req, res, next) => {
  const token = req.cookies.token || '';

  try {
    if (!token) {
      res.status(401).json('You must be logged in');
    }

    const decrypt = await jwt.verify(token, secret);
    req.user = {
      userID: decrypt.userID
    };
    console.log('userID', req.user);
    next();
  } catch (err) {
    res.status(500).json(err.toString());
  }

  // if (!token) {
  //   jwt.verify(token, secret.jwtSecrets, (err, decodedToken) => {
  //     if (err) {
  //       res.status(401).json({ message: 'Please add a valid token' });
  //     } else {
  //       req.decodedJwt = decodedToken;
  //       next();
  //     }
  //   });
  // } else {
  //   res.status(500).json({ message: 'Token required' });
  // }
};
