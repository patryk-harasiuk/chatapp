const Room = require("../model/roomModel");

const getMessagesWithPopulate = (roomId) => {
  return Room.findById(roomId).populate({
    path: "messages",
    options: { sort: { $natural: -1 } },
    perDocumentLimit: 35,
  });
};

// const getMessagesWithPopulate = (roomId) => {
//   return Room.aggregate([
//     { $match: { _id: roomId } },
//     {
//       $lookup: {
//         from: "Message",
//         localField: "messages",
//         foreignField: "_id",
//         as: "Message",
//       },
//     },
//     { $skip: 0 },
//     { $limit: 25 },
//     { $sort: { "Message.createdAt": -1 } },
//   ]);
// };

module.exports = getMessagesWithPopulate;
