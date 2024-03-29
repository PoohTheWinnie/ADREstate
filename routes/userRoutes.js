const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const userStatuses = require("../middleware/userStatuses");
const auth = require("../middleware/auth");


//User Model
const User = require('../models/user');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, userType } = req.body;
    const bio = `My name is ${name}`;
    const image = null;

    //simple validation
    if(!name || !email || !password || !userType) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });
        
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            userType,
            // Mark user as unregistered
            status: userStatuses.REGISTRATION_REQUIRED,
            bio: bio,
            image: image
        });

        //Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user:{
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    userType: user.userType,
                                    status: user.status
                                }
                            });
                        }
                    )
                    });
                });
            })
        })
    });

router.get('/:userId', auth, (req, res) => {
    if (!req.params.userId) {
        return res.status(400).json({msg: 'User does not exist'});
    }
    
    User.findById(req.params.userId, function (err, user) {
        if (!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }
        return res.json(user);
    });
});

router.put('/:userId', (req, res) => {
    const { name, role, bio } = req.body;

    User.findByIdAndUpdate(req.params.userId, {
        name: name,
        userType: role,
        bio: bio,
    }, (err) => {
        console.log(err); 
    } )
    
});


module.exports = router;