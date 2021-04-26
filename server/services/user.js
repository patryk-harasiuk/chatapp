const User = require("../model/user");

const addRoomToUser = (userId, roomId) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { rooms: roomId } },
    { new: true }
  );
};

module.exports = addRoomToUser;
