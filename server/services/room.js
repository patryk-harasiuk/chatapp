const Room = require("../model/roomModel");

const addUserToRoom = (userId, roomId) => {
    return Room.findByIdAndUpdate(
        roomId,
        { $push: { users: userId } }
    );
};

module.exports = addUserToRoom;