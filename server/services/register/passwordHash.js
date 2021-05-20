const bcrypt = require("bcrypt");

const handlePasswordHash = (plainTextPassword, salt) => {
  const salt = bcrypt.genSalt(10);
  return bcrypt.hash(plainTextPassword, salt);
};

module.exports = handlePasswordHash;
