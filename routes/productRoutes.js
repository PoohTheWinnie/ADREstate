
const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const auth = require("../middleware/auth");

router.post("/", auth, (req, res) => {
    const {name, description} = req.body;
    var newProduct = new Product({
        name,
        description
    });

    console.log('Checkpoint Product Routes Post '); 
    console.log(newProduct); 
    
    newProduct.save().then(product => {
        console.log('saving it');
        res.json({
            product
        });
    }).catch(err => {
        console.log('err is');
        console.log('err', err);
        res.status(400).json({msg: "Please enter all fields"});
    });
});

router.get("/:productId", auth, (req, res) => {
    if (!req.params.productId) {
        return res.status(400).json({msg: "Product does not exist"});
    }
    
    Product.findById(req.params.productId, function (err, product) {
        if (product == null) {
            return res.status(404).json({msg: "Product does not exist"});
        }
        return res.json(product);
    });
});

// router.get("/:productId/employers", auth, (req, res) => {
//     if (!req.params.productId) {
//         return res.status(400).json({msg: "Product does not exist"});
//     }
    
//     Employer.find({productId: req.params.productId}, function (err, employers) {
//         return res.json(employers);
//     });
// });

module.exports = router;



// module.exports = (app) => {

//   app.get(`/api/product`, async (req, res) => {
//     let products = await Product.find();
//     return res.status(200).send(products);
//   });

//   app.post(`/api/product`, async (req, res) => {
//     let product = await Product.create(req.body);
//     return res.status(201).send({
//       error: false,
//       product
//     })
//   })

//   app.put(`/api/product/:id`, async (req, res) => {
//     const {id} = req.params;

//     let product = await Product.findByIdAndUpdate(id, req.body);

//     return res.status(202).send({
//       error: false,
//       product
//     })

//   });

//   app.delete(`/api/product/:id`, async (req, res) => {
//     const {id} = req.params;

//     let product = await Product.findByIdAndDelete(id);

//     return res.status(202).send({
//       error: false,
//       product
//     })

//   })

// }