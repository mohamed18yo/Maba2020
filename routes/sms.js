var express = require("express");
var router = express.Router();
var message = require("../helper/sms");
/* GET users listing. */


router.get("/", function (req, res, next) {
    res.render('admin/sendSMS');    
});


router.post("/send", function (req, res, next) {
  let { phone, text } = req.body;
  message.sendSms("Maba", phone, text ,(err,responseData)=>{
    if (err) {
      console.log(err);
  } else {
      if(responseData.messages[0]['status'] === "0") {
          console.log("Message sent successfully.");
      } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      }
  }
  });
  res.redirect('/admin/sms');
});

module.exports = router;
