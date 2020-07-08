var mongoose = require("../helper/db");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  fcmToken: String,
  isAdmin: {type : Boolean , default : false},
  fbId: String,
  gId: String,
  picture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
