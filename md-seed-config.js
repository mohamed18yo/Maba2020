var mongoose = require("mongoose");
var countries = require("./seeders/countries.seeder");
var cities = require("./seeders/cities.seeder");
const mongoURL =
  process.env.MONGO_URL ||
  "mongodb+srv://admin:admin@123456@cluster0-6vbua.mongodb.net/MabaDB?retryWrites=true&w=majority";

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  countries,
  cities
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = {
  seedersList,
  connect,
  dropdb,
};
