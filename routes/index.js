var express = require("express");
var router = express.Router();
var passport = require("passport");
var jwt = require("jsonwebtoken");

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

var User = require("../models/user");
var Product = require("../models/product");
var shared = require("../models/shared");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appnotify-9296a.firebaseio.com",
});

/* GET home page. */
router.get("/dashboard", async function (req, res, next) {
  res.render("dashboard", {
    title: "index",
    usersCount: await shared.usersCount(),
    productsCount: await shared.productsCount(),
  });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

/* Post login page. */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    if (req.session.passport.user.isAdmin) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    }
  }
);

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "register" });
});

/* POST register page. */
router.post("/register", function (req, res, next) {
  User.create(req.body).then(function (result) {
    res.redirect("/");
  });
});

// router.use((req , res , next)=>{
//   console.log("req.user" , req.user);
//   res.locals.user = req.user;
//   next();
// })

/* GET table page. */
router.get("/table", function (req, res, next) {
  res.render("table", { title: "table" });
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
  function (req, res) {
    // The request will be redirected to Google for authentication, so
    // this function will not be called.
  }
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.post("/api/login", function (req, res) {
  if (req.body.username == "Oday" && req.body.password == "123456") {
    var token = jwt.sign({ firstName: "Oday", lastName: "Alqarra" }, "authApp");
    res.json({ token });
  } else {
    res.json("Not found your account");
  }
});

router.get("/notifications", (req, res) => {
  db.User.find(function (err, users) {
    res.render("notifications", { users: users });
  });
});

router.post("/sendNotification", (req, res) => {
  if (req.body.userId === "all") {
    admin.messaging().sendAll({ titel: req.body.title, body: req.body.text });
  } else {
    User.findOne({ _id: req.body.userId }, (err, user) => {
      console.log(user);

      //  admin.messaging().send({token : user.token , data : {titel : req.body.title , body : req.body.text}});
    });
  }
  res.send("notification sent");
});

router.post("/registerToken", (req, res) => {
  console.log("token", req.body.token);
  User.findById();
  users.push({ token: req.body.token });
});

router.get("/", async (req, res) => {
  Product.find(async (err, products) => {
    res.render("products", {
      products,
      cartCount: await shared.getCartCount(
        req.session.passport ? req.session.passport.user._id : null
      ),
    });
  });
});

router.get("/product/:id", async (req, res) => {
  Product.findById(req.params.id, async (err, product) => {
    res.render("product", {
      product,
      cartCount: await shared.getCartCount(
        req.session.passport ? req.session.passport.user._id : null
      ),
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
