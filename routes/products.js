var express = require("express");
var router = express.Router();
var Product = require("../models/product");

/* GET products listing. */
router.get("/", function (req, res, next) {
  Product.find(function (err, result) {
    res.render("admin/products", { products: result });
  });
});

// Get Page Add Product.
router.get("/addProduct", function (req, res, next) {
  res.render("admin/addProduct");
});
// Add Product.
router.post("/addProduct", function (req, res, next) {
  Product.create(req.body);
  res.redirect("/admin/products");
});

//Get Page Edit Product.
router.get("/editProduct/:id", async function (req, res, next) {
  let result = await Product.findById(req.params.id);
  res.render("admin/editProduct", { product: result });
});

//  Edit Product.
router.post("/editProduct", function (req, res) {
  //res.send(req.body)

  Product.updateOne({ _id: req.body.id }, { $set: req.body },(err)=>{
    console.log(err);
    
  });
  res.redirect("/admin/products");
});

// Delete Product.
router.get("/deleteProduct/:id", function (req, res, next) {
  let id = req.params.id;
  Product.deleteOne({_id:id},(err)=>{
    console.log(err);
    
  });
  res.redirect("/admin/products");
});

module.exports = router;
