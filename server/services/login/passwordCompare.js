const bcrypt = require("bcrypt");

const handlePasswordCheck = async (password, actualPassword, res) => {
  const validPassword = await bcrypt.compare(password, actualPassword);
  if (!validPassword)
    return res
      .status(400)
      .send({ errorMessage: "Password is wrong", path: "password" });
};

module.exports = handlePasswordCheck;
