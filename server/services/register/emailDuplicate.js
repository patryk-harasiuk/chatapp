const User = require("../../model/user");

const handleEmailDuplicate = (email) => {
  const emailDuplicate = User.findOne({ email: email });
  if (emailDuplicate)
    return res
      .status(400)
      .send({ errorMessage: "Email adress already exists", path: "email" });
};

module.exports = handleEmailDuplicate;
