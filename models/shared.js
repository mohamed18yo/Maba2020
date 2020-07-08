var Product = require("./product");
var User = require("./user");
const Cart = require("./cart");
const Country = require("./country");
const City = require("./city");

async function productsCount() {
  return Product.count((err, count) => {
    return count;
  });
}

async function usersCount() {
  return User.count((err, count) => {
    return count;
  });
}

async function getCartCount(id) {
  return Cart.count({ user: id }, (err, count) => {
    return count;
  });
}

async function getCountries() {
  return new Promise((resolve, reject) => {
    Country.find((err, result) => {
      resolve(result);
    });
  });
}
async function getCities(id) {
  return new Promise((resolve, reject) => {
    City.find({ country: id }, (err, result) => {
      resolve(result);
    });
  });
}

async function getCart(id) {
  return Cart.find({ user: id }, (errr, result) => {
    // console.log("result cart", result);
    return result;
  }).populate("product");
}


async function getCartPorductsIds(id) {
  return Cart.find({ user: id }, (errr, result) => {
    return result.product;
  });
}

function removeCart(id) {
  Cart.deleteMany({user : id}, (err)=>{
    console.log(err);
  })
}

function dropProduct(userId , productId){
Cart.deleteOne({user:userId, product:productId},(err)=>{
  console.log(err);
})
}
async function sumCart(cart) {
  return new Promise((resolve, reject) => {
    var total = 0;
    cart.forEach((c) => {
      total += c.product.price * c.count;
    });
    resolve(total);
  });
}

async function getAlgeriaId() {
  return Promise((resolve, reject) => {
    Country.findOne({ name: "Algeria" }, (err, country) => {
      resolve(country._id);
    });
  });
}

async function getAlbaniaId() {
  return Promise((resolve, reject) => {
    Country.findOne({ name: "Albania" }, (err, country) => {
      resolve(country._id);
    });
  });
}

async function getAndorraId() {
  return Promise((resolve, reject) => {
    Country.findOne({ name: "Andorra" }, (err, country) => {
      resolve(country._id);
    });
  });
}

module.exports = {
  productsCount,
  usersCount,
  getCartCount,
  getCart,
  sumCart,
  getCountries,
  getCities,
  getAlgeriaId,
  getAlbaniaId,
  getAndorraId,
  getCartPorductsIds,
  removeCart,
  dropProduct
};
