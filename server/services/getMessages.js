const Room = require("../model/roomModel");

// const getMessagesWithPopulate = (roomId) => {
//   return Room.findById(roomId).populate({
//     path: "messages",
//     options: { perDocumentLimit: 25 },
//   });
// };

const getMessagesWithPopulate = (roomId) => {
  return Room.findById(roomId).populate("messages").slice("messages", -25);
};

module.exports = getMessagesWithPopulate;
