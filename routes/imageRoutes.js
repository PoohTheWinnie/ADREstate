// const express = require('express');
// const router = express.Router();
// const config = require('config');
// const jwt = require('jsonwebtoken');
// const userStatuses = require("../middleware/userStatuses");
// const auth = require("../middleware/auth");


// //User Model
// const User = require('../models/user');

// app.post('/api/image', upload.single('image'), (req, res) => {
 
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });

// app.get('/api/image', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.render('app', { items: items });
//         }
//     });
// });

// module.exports = router;