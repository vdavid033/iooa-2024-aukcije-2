const jwt = require("jsonwebtoken");
const config = require("../aukcije-server/auth.config.js");

verifyTokenAdmin = (req, res, next) => {
  /*   let token = req.headers["x-access-token"]; */
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    /*     req.role = decoded.uloga; // Assign the role to the request object */
    if (decoded.uloga === "admin") {
      next();
    } else {
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });
};

verifyTokenUser = (req, res, next) => {
  /*   let token = req.headers["x-access-token"]; */
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
  });
  next();
};

const authJwt = {
  verifyTokenAdmin: verifyTokenAdmin,
  verifyTokenUser: verifyTokenUser,
};
module.exports = authJwt;
