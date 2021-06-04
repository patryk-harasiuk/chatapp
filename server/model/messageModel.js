const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  body: String,
  username: String,
  userAvatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", Message);
