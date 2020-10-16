const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    subscription: {
        type: String,
        required: true
    },
    childAge: {
        type: String,
        required: true
    },
    filterAge: {
        type: String,
        required: true
    },
    filterLang: {
        type: String,
        required: true
    },
    filterAd: {
        type: String,
        required: true
    },
    filterViol: {
        type: String,
        required: true
    },
    filterMaxViewTime: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile

// subscription,
// childAge,
// filterAge,
// filterLang,
// filterViol
// filterAd,
// filterMaxViewTime,
// date