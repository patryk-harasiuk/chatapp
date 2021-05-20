const handleUserExists = (userExists) => {
  if (!userExists)
    return res
      .status(400)
      .send({ errorMessage: "Email is not found", path: "email" });
};

module.exports = handleUserExists;
