const bcrypt = require("bcrypt");

const handlePasswordCheck = () => {
  const validPassword = bcrypt.compare(password, userExists.password);
  if (!validPassword)
    return res
      .status(400)
      .send({ errorMessage: "Password is wrong", path: "password" });
};

module.exports = handlePasswordCheck;
