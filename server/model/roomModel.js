const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

// roomSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Room", roomSchema);
