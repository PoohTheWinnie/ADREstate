
const express = require("express");
const mongoose = require("mongoose");
const path =  require("path");
const config = require("config");
var fs = require('fs');
var multer = require('multer');


const app = express();

// mongoose.Promise = global.Promise;
const db = config.get('mongoURI');

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function(){
        console.log("Connection successful!");
    })
    .catch(function(err){
        console.log(err);
    })

app.use(express.json());

app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/house', require('./routes/houseRoutes'));
// app.use('/api/image', require("./routes/imageRoutes"));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log(`The app is running on port ${PORT}`);
})