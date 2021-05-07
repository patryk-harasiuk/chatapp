const Room = require("../model/roomModel");

const getMoreMessages = (roomId) => {
  return Room.findById(roomId).populate("messages").slice("messages", -25);
};

module.exports = getMoreMessages;
