const Room = require("../model/roomModel");

const getMessagesWithPopulate = (roomId) => {
  return Room.findById(roomId).populate({
    path: "messages",
    options: { sort: { $natural: -1 } },
    perDocumentLimit: 35,
    select: "-__v",
  });
};

module.exports = getMessagesWithPopulate;
