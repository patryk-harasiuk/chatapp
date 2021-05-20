const Room = require("../../model/roomModel");

const handleRoomCheck = (name) => {
  Room.findById({ _id: name }, (err) => {
    if (err)
      return res
        .status(400)
        .send({ errorMessage: "Room is not found", path: "name" });
  });
};

module.exports = handleRoomCheck;
