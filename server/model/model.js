const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userAvatar: {
        type: String,
        default: 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown_1-512.png'
    }
});

module.exports = mongoose.model('User', userSchema);