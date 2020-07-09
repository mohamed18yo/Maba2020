const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: '4a0ef2c7',
//   apiSecret: '8vo0GlaFkRZPQ4bT',
// });
const nexmo = new Nexmo({
  apiKey: '87879cc0',
  apiSecret: '1JMotQSfpT3vuKkK',
});

module.exports = nexmo.message;

// const Nexmo = require('nexmo');


// const from = 'Vonage APIs';
// const to = '970599192995';
// const text = 'Hello from Vonage SMS API';

// nexmo.message.sendSms(from, to, text);