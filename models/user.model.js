const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
}
);

const User = mongoose.model('user', userSchema);

module.exports = User;