var mongoose = require("../helper/db");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  count : {type : Number , default : 1}
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
