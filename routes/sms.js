var express = require("express");
var router = express.Router();
var message = require("../helper/sms");
/* GET users listing. */


router.get("/", function (req, res, next) {
    res.render('admin/sendSMS');    
});


router.post("/send", function (req, res, next) {
  let { phone, text } = req.body;
  message.sendSms("Maba", phone, text);
  res.redirect('/sms');
});

module.exports = router;
