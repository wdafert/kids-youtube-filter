const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require ('../../models/user.model')

// @route   POST api/users
// @desc     Register user
// @access   Public

router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please check it is a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').isLength({min:6})
    ],
   async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const { name, email, password } = req.body;
        try {
        // Check if user exists already
            let user = await User.findOne({email:email})
            if (user) {
               return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        
            }
            // Get useres gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })
        //Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
        // Return jsonwebtoken
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