const jwt = require("jsonwebtoken");

const handleTokenGenerate = () => {
  jwt.sign({ id: userExists._id }, process.env.TOKEN_SECRET, {
    expiresIn: "86400s",
  });
};

module.exports = handleTokenGenerate;
