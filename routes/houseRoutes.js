
const express = require("express");
const router = express.Router();

const House = require("../models/House");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
    const {strAdd, lat, lng, pictureLink, description} = req.body;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    
    var newHouse = new House({
        address: strAdd,
        latitude: lat,
        longitude: lng,
        pictureLink: pictureLink,
        description: description,
        date: newdate,
    });

    console.log('Checkpoint House Routes Post '); 
    console.log(newHouse); 
    
    newHouse.save().then(house => {
        console.log('saving it');
        res.json({
            house
        });
    }).catch(err => {
        console.log('err is');
        console.log('err', err);
        res.status(400).json({msg: "Please enter all fields"});
    });
});

router.get('/', auth, (req, res) => {
    console.log("test");
    House.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Result");
            return res.json(result);
        }
      });
});

module.exports = router;