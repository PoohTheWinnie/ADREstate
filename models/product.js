const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
    name:{
        type: String,
    },
    description:{
        type: String,
    },
});

// UserSchema.methods.setStatus = function(newStatus) {
//     this.status = newStatus;
//     this.save();
// };

module.exports = Product = mongoose.model('product', ProductSchema);