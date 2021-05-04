const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: Date,
});

module.exports = mongoose.model("Message", Message);
