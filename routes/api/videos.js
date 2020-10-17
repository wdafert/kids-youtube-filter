const router = require('express').Router();
let Video = require('../../models/video.model');


router.get('/', (req, res) => {
    Video.find()
        .then(videos => res.json(videos))
        .catch(err => res.status(400).json('Error: ' + err));
})

// get 1 Video by id
router.get('/:id', (req, res) => {
    Video.findById(req.params.id)
        .then(video => res.json(video))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete 1 Video by id
router.delete('/:id', (req, res) => {
    Video.findByIdAndDelete(req.params.id)
        .then(video => res.json('Video deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update 1 Video by id
router.post('/update/:id', (req, res) => {
    Video.findById(req.params.id)
        .then(video => {
            video.ad = req.body.ad;
            video.age = req.body.age;
            video.lang = req.body.lang;
            video.viol = req.body.viol;
            video.videoId = req.body.videoId;
            video.title = req.body.title;
            video.description = req.body.description;
            video.thumbnail = req.body.thumbnail;
            video.channelTitle = req.body.channelTitle;
            video.channelId = req.body.channelId;
            video.save()
                .then(() => res.json('Video updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const ad = req.body.ad;
    const age = req.body.age;
    const lang = req.body.lang;
    const viol = req.body.viol;
    const videoId = req.body.videoId;
    const title = req.body.title;
    const description = req.body.description;
    const thumbnail = req.body.thumbnail;
    const channelTitle = req.body.channelTitle;
    const channelId = req.body.channelId;

    const newVideo = new Video({
        ad,
        age,
        lang,
        viol,
        videoId,
        thumbnail,
        channelTitle,
        description,
        title,
        channelId
    });
    newVideo.save()
        .then(() => res.json('Video added to Database!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;