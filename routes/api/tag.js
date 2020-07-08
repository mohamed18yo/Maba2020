var express = require('express');
var router = express.Router();

/* GET tags listing. */
router.get('/', function(req, res, next) {
  res.json(["C#" , "Java" , "PHP" , "NodeJS" , "C++"]);
});

module.exports = router;
