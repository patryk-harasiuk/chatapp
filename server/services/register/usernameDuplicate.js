const User = require("../../model/user");

const handleUsernameDuplicate = (username) => {
  const usernameDuplicate = User.findOne({ username: username });
  if (usernameDuplicate)
    return res
      .status(400)
      .send({ errorMessage: "Username already exists", path: "username" });
};

module.exports = handleUsernameDuplicate;
