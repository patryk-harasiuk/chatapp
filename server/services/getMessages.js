const Room = require("../model/roomModel");

const getMessagesWithPopulate = (roomId) => {
  return Room.findById(roomId).populate({
    path: "messages",
    perDocumentLimit: 20,
  });
};

module.exports = getMessagesWithPopulate;
