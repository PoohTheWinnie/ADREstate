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
    bedrooms:{
        type: Number
    },
    bathrooms:{
        type: Number
    },
    amenities:{
        type:String
    },
    squareFeet:{
        type: Number,
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
        type: Number,
        default: 0
    },
    valueReasoning:{
        type: String
    },
    postedBy:{
        type: String
    },
    postedName:{
        type: String
    },
    reviewedBy:{
        type: String
    },
    reviewedName:{
        type: String
    },
    secondReview:{
        type: String
    }
});

module.exports = House = mongoose.model('house', HouseSchema);