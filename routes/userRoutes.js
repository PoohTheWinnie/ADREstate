const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const userStatuses = require("../middleware/userStatuses");
const auth = require("../middleware/auth");


//User Model
const User = require('../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, userType } = req.body;
    console.log("User Routes")

    //simple validation
    if(!name || !email || !password || !userType) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing user
    User.findOne({ email, status: {$ne: userStatuses.DEACTIVATED} })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });
        
        const newUser = new User({
            name,
            email,
            password,
            userType,
            // Mark user as unregistered
            status: userStatuses.REGISTRATION_REQUIRED
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
    console.log(req.params);
    if (!req.params.userId) {
        return res.status(400).json({msg: 'User does not exist'});
    }
    
    User.findById(req.params.userId, function (err, user) {
        if (!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }
        console.log("get User"); 
        console.log(user);
        return res.json(user);
    });
});

module.exports = router;