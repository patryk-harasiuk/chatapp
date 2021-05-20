const bcrypt = require("bcrypt");

const handlePasswordHash = async (plainTextPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(plainTextPassword, salt);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
  return null;
};

module.exports = handlePasswordHash;
