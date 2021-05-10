const Room = require("../model/roomModel");

const getMoreMessages = (roomId, skipValue) => {
  return Room.findById(roomId).populate({
    path: "messages",
    options: { sort: { $natural: -1 } },
    skip: skipValue,
    perDocumentLimit: 35,
    select: "-__v",
  });
};

module.exports = getMoreMessages;
