const Room = require("../model/roomModel");

const getMoreMessages = (roomId, pageIndex) => {
  const PAGE_SIZE = 35;
  const page = parseInt(pageIndex || "0");
  return Room.findById(roomId).populate({
    path: "messages",
    options: { sort: { $natural: -1 } },
    limit: PAGE_SIZE,
    skip: PAGE_SIZE * page,
    select: "-__v",
  });
};

module.exports = getMoreMessages;
