require("dotenv").config();
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    return res.status(401).send({ errorMessage: "Invalid access token" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ errorMessage: "Invalid access token" });
    req.user = user;
    next();
  });
};

module.exports = authToken;
