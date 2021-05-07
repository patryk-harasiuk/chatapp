const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  body: String,
  username: String,
  userAvatar: String,
  createdAt: Date,
});

module.exports = mongoose.model("Message", Message);
