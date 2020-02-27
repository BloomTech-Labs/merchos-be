const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecrets, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Please add a valid token" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(500).json({ message: "Token required" });
  }
};
