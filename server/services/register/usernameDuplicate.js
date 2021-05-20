const User = require("../../model/user");

const handleUsernameDuplicate = async (username, res) => {
  const usernameDuplicate = await User.findOne({ username: username });
  return usernameDuplicate
    ? res
        .status(400)
        .send({ errorMessage: "Username already exists", path: "username" })
    : username;
};

module.exports = handleUsernameDuplicate;
