var mongoose = require("../helper/db");

const citySchema = new mongoose.Schema({
  name : String,
  country : {type : mongoose.SchemaTypes.ObjectId , ref : 'Country'}
});

const City = mongoose.model("City", citySchema);

module.exports = City;
