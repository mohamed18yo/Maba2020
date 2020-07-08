const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '4a0ef2c7',
  apiSecret: '8vo0GlaFkRZPQ4bT',
});

module.exports = nexmo.message;