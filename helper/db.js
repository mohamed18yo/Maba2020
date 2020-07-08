const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:admin@123456@cluster0-6vbua.mongodb.net/MabaDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = mongoose;
