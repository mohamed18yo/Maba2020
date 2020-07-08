var mongoose = require("../helper/db");

const countrySchema = new mongoose.Schema({
  name : String
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
