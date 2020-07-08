var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var checkoutRouter = require("./routes/checkout");
var cartRouter = require('./routes/cart');
var smsRouter = require('./routes/sms');
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var postsRouter = require("./routes/api/posts");
var tagsRouter = require("./routes/api/tag");


var passport = require("passport");
var passportLocal = require("passport-local");
var passportFacebook = require("passport-facebook");
var passportGoogle = require("passport-google-oauth20").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var User = require('./models/user');

var admin = require('./middlewares/admin');
var user = require('./middlewares/user');

var app = express();



passport.use(
  new passportGoogle(
    {
      clientID:
        "552530349583-q07h7vcbssefsoop6hlr03mu6986o1mp.apps.googleusercontent.com",
      clientSecret: "g5C1eXQEdUCIoe5I8VNeyg8x",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("profile", profile);

      User.findOne({ gId: profile._json.sub }, function (err, res) {
        if (res) {
          cb(null, res);
        } else {
          User.create({
            gId: profile._json.sub,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            picture: profile._json.picture,
          })
            .then(function (result) {
              cb(null, result);
            })
            .catch(function (err) {
              cb(err, false);
            });
        }
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "authApp",
    },
    function (jwtPayload, cb) {
      return cb(null, { username: "oday" });
    }
  )
);

passport.use(
  new passportLocal(function (username, password, cb) {
    User.findOne({ email: username }, function (err, res) {
      if (res) {
        if (res.password == password) {
          cb(null, res);
        } else {
          cb(null, false);
        }
      } else {
        cb(null, false);
      }
    });
  })
);

passport.use(
  new passportFacebook(
    {
      clientID: "3154113628003536",
      clientSecret: "9e3354fc040c31e95dc2a2a00c1dc4bd",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {

      User.findOne({ fbId: profile._json.id }, function (err, res) {
        if (res) {
          cb(null, res);
        } else {
          let fullName = profile._json.name.split(" ");
          User.create({
            fbId: profile._json.id,
            firstName: fullName[0],
            lastName: fullName[1],
            email: profile._json.email,
          })
            .then(function (user) {
              console.log("user", user);

              return cb(null, user);
            })
            .catch(function (err) {
              console.log("err", err);

              return cb(err, false);
            });
        }
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (id, cb) {
  cb(null, { username: "Oday" });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "vash");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

var auth = passport.authenticate("jwt", { session: false });

app.use(function(req , res , next) {
  res.locals.user = req.session.passport ? req.session.passport.user : null;
  console.log("res.locals.user" , res.locals.user);
  next();
})

app.use("/", indexRouter);
app.use("/checkout", user , checkoutRouter);
app.use('/cart' , user, cartRouter);
app.use('/admin/sms' , admin , smsRouter);
app.use("/admin/users", admin, usersRouter);
app.use("/admin/products", admin,  productsRouter);

app.use("/api/posts", auth, postsRouter);
app.use("/api/tags", auth, tagsRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
