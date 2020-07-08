var express = require("express");
var router = express.Router();

/* GET posts listing. */
router.get("/all", function (req, res, next) {
  res.json([
    { title: "Post 1", body: "This is post 1" },
    { title: "Post 2", body: "This is post 2" },
  ]);
});

router.get("/one", function (req, res, next) {
  res.json({ title: "Post 1", body: "This is post 1" });
});

module.exports = router;
