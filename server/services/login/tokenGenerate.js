const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleTokenGenerate = (userID) => {
  return jwt.sign({ id: userID }, process.env.TOKEN_SECRET, {
    expiresIn: "86400s",
  });
};

module.exports = handleTokenGenerate;
