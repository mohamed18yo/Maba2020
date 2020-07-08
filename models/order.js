var mongoose = require("../helper/db");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }],
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  address2: String,
  country: { type: mongoose.SchemaTypes.ObjectId, ref: "Country" },
  city: { type: mongoose.SchemaTypes.ObjectId, ref: "City" },
  zip: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
