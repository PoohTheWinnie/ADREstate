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
    },
    // postedBy:{
    //     type: String
    // },
});

// UserSchema.methods.setStatus = function(newStatus) {
//     this.status = newStatus;
//     this.save();
// };

module.exports = House = mongoose.model('house', HouseSchema);