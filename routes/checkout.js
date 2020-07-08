var express = require("express");

var router = express.Router();

var shared = require("../models/shared");
const Order = require("../models/order");
const Country = require("../models/country");

var stripe = require("stripe")(
  "sk_test_51H05b6DAmIkPv4IVku6r4MqwrJ6PMT8NlY2MXNMW5EaI2mavJbHmfiSjfEoBdaQi4NcjHPbByJ1aJWKeQPrMaAlL00sDXBQjOP"
);

router.get("/", async (req, res) => {
  let id = req.session.passport ? req.session.passport.user._id : null;
  let cart = await shared.getCart(id);
  res.render("checkout", {
    cartCount: await shared.getCartCount(id),
    cart: cart,
    total: await shared.sumCart(cart),
    countries: await shared.getCountries(),
  });
});

router.post("/charge", async (req, res) => {
  let { firstName, lastName, email, stripeToken } = req.body;
  let id = req.session.passport.user._id;
  let amount = await shared.sumCart(await shared.getCart(id));
  stripe.customers
    .create({
      name: `${firstName} ${lastName}`,
      email: email,
      source: stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: amount * 10,
        currency: "usd",
        customer: customer.id,
      })
    )
    .then(async () => {
      req.body.user = id;
      req.body.products = await shared.getCartPorductsIds(id);
      Order.create(req.body, (err, result) => {
        shared.removeCart(id);
        res.render('thankYou');
      });
    })
    .catch((err) => console.log(err));
});

router.get("/citeis/:id", async (req, res) => {
  res.json(await shared.getCities(req.params.id));
});

module.exports = router;
