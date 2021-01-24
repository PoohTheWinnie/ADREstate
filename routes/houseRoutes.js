
const express = require("express");
const router = express.Router();

const House = require("../models/house");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
    const {strAdd, lat, lng, pictureLink, bedrooms, bathrooms, squareFeet, description, userId, name} = req.body;
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = month + "/" + day + "/" + year;

    var newHouse = new House({
        address: strAdd,
        latitude: lat,
        longitude: lng,
        pictureLink: pictureLink,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        squareFeet: squareFeet,
        description: description,
        postedBy: userId,
        postedName: name,
        date: newdate,
    });
    
    newHouse.save().then(house => {
        console.log('Registering...');
        res.json({
            house
        });
    }).catch(err => {
        console.log('err', err);
        res.status(400).json({msg: "Please enter all fields"});
    });
});

router.get('/', auth, (req, res) => {
    const { type, userId } = req.query;
    if(type === "Home Owner"){
        House.find({$or:[{ status: true }, { postedBy: userId }]}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Result");
                return res.json(result);
            }
        });
    }else{
        House.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Result");
                return res.json(result);
            }
        });
    }
    
});

router.get("/:userId", auth, (req, res) => {
    if (!req.params.userId) {
        return res.status(400).json({msg: "User does not exist"});
    }
    const { type } = req.query;
    if(type === "Home Owner"){
        House.find({ postedBy: req.params.userId }, function (err, houses) {
            if (err) console.log(err);
            if (houses == null) {
                return res.status(404).json({msg: "User does not exist"});
            }
            return res.json(houses);
        });
    }else{
        House.find({ reviewedBy: req.params.userId }, function (err, houses) {
            if (err) console.log(err);
            if (houses == null) {
                return res.status(404).json({msg: "User does not exist"});
            }
            return res.json(houses);
        });
    }
});

router.put('/:houseAdd', (req, res) => {
    const { status, reviewedBy, reviewedName, value, reasoning } = req.body;

    House.findOneAndUpdate({address: req.params.houseAdd}, {
        value: value,
        valueReasoning: reasoning,
        status: status,
        reviewedBy: reviewedBy,
        reviewedName: reviewedName
    }, {useFindAndModify: false}, (err) => {
        console.log(err);
    } )
    
});

router.delete('/', (req, res) => {
    const { address } = req.body;

    House.deleteOne({ address: address }, function (err) {
        if (err) console.log(err);
    }); 
});



module.exports = router;