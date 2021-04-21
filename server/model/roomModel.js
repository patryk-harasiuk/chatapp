const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    roomPassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Room', roomSchema);