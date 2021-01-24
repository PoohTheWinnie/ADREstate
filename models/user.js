
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    userType:{
        type: String,
        required: true,
    },
});

UserSchema.methods.setStatus = function(newStatus) {
    this.status = newStatus;
    this.save();
};

module.exports = User = mongoose.model('user', UserSchema);