const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    ad: { type: String, required: true },
    age: { type: String, required: true },
    lang: { type: String, required: true },
    viol: { type: String, required: true },
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    channelTitle: { type: String, required: true },
    channelId: { type: String, required: true },
}, {
    timestamps: true,
}
);

const Video = mongoose.model('video', videoSchema);

module.exports = Video;