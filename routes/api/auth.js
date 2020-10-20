const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

// @Route  GET api/auth
// desc     Test route
// @access  public

router.get('/', auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
    
// @route   POST api/auth
// desc     Authenticate user & get token
// access   Public

router.post(
    '/',
    [
       
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        try {
            // Check if user exists already
            let user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

            }
           
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
             }

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },  //in production 3600
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            )

           
            // res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    })

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;