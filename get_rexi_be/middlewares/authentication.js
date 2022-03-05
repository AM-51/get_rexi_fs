const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ message });
        reject();
      }
      req.body.decoded = decoded;
      resolve(decoded);
      next();
    });
  });
};

const authenticateAdmin = (req, res, next) => {
  const adminToken = req.headers.authorization.replace("Bearer ", "");
  return new Promise((resolve, reject) => {
    jwt.verify(adminToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ message });
        reject();
      }
      resolve(decoded);
      if (decoded.isAdmin === 1) {
        return next();
      }
    });
  });
};

module.exports = { authenticateAdmin, authenticateToken };
