const User = require("../../model/user");

const handleEmailDuplicate = async (email, res) => {
  const emailDuplicate = await User.findOne({ email: email });
  return emailDuplicate
    ? res
        .status(400)
        .send({ errorMessage: "Email adress already exists", path: "email" })
    : email;
};

module.exports = handleEmailDuplicate;
