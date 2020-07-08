var mongoose = require("../helper/db");

const productSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
