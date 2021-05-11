const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");

const Message = new mongoose.Schema({
  body: String,
  username: String,
  userAvatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Message.plugin(mongoosePaginate);
module.exports = mongoose.model("Message", Message);
