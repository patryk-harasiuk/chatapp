const User = require("../model/user");

const getRoomsWithPopulate = (id) => {
  return User.findById(id).populate(
    "rooms",
    "-__v -roomPassword -users -messages"
  );
};

module.exports = getRoomsWithPopulate;
