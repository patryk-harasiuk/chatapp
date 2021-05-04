const Message = require("../model/messageModel");
const Room = require("../model/roomModel");

const createMessage = (roomId, message) => {
  return Message.create(message).then((docMessage) => {
    return Room.findByIdAndUpdate(
      roomId,
      { $push: { messages: docMessage._id } },
      { new: true }
    );
  });
};

module.exports = createMessage;
