const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const HouseSchema = new Schema({
    address:{
        type: String,
        unique: true,
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    pictureLink:{
        type: String,
    },
    description:{
        type: String
    },
    date:{
        type: String,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: false
    },
    value: {
        type: Number
    },
    postedBy:{
        type: String
    },
    reviewedBy:{
        type: String
    }
});

module.exports = House = mongoose.model('house', HouseSchema);