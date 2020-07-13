var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host:'localhost',
    service: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mohamed18yosef@gmail.com',
      pass: 'Mohamed5411057+'
    }
  });

  module.exports={ nodemailer,
                   transporter,

} ;