const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');  //???
const Profile = require('../../models/profile')
const User = require('../../models/user.model')

// @route   GET api/profile/me
// @desc    Get current user Profile
// @access  Private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']) // add extra information from user model
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }

});

// @route   POST  api/profile
// @desc    Create or update user profile
// @access  Private

router.post('/',                    // uses both auth middleware and also the express validation
    [auth,
        [
            check('subscription', 'Subscription level is required')    // TODO check for the required fields
                .not()
                .isEmpty()
            // TODO ... add extra required fields
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {
            subscription,
            childAge,
            filterAge,
            filterLang,
            filterAd,
            filterViol,
            filterMaxViewTime,
            date
        } = req.body; // destructure all values from the request body
        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (subscription) profileFields.subscription = subscription;
        if (childAge) profileFields.childAge = childAge;
        if (filterAge) profileFields.filterAge = filterAge;
        if (filterLang) profileFields.filterLang = filterLang;
        if (filterAd) profileFields.filterAd = filterAd;
        if (filterViol) profileFields.filterViol = filterViol;
        if (filterMaxViewTime) profileFields.filterMaxViewTime = filterMaxViewTime;
        if (date) profileFields.date = date;
        // console.log(profileFields);
        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                // Update exisitng profile
                profile = await Profile.
                    findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    );
                return res.json(profile)
            }

            // if no profile found then create profile
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error');
        }
    }

)

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',
            ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile from 1 user by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found.' });
        res.json(profile);
    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found.' });
        }
        res.status(500).send('Server Error');
    }
})


// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private

router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id });
        await User.findOneAndDelete({ _id: req.user.id });
        return res.json({msg:'User deleted'})
    } catch (err) {
        console.error(err.message)     
        res.status(500).send('Server Error');
    }
})


module.exports = router;