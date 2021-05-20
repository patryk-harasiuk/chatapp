const User = require("../../model/user");

const handleUserExists = (email) => {
  const userExists = User.findOne({ email: email });
  if (!userExists)
    return res
      .status(400)
      .send({ errorMessage: "Email is not found", path: "email" });
};

module.exports = handleUserExists;
