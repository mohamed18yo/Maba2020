var Seeder = require("mongoose-data-seed").Seeder;

var Country = require('../models/country');

const data = [
  {
    name: "Algeria",
  },
  {
    name: "Albania",
  },
  {
    name: "Andorra",
  }
];

class CountriesSeeder extends Seeder {
  async shouldRun() {
    return Country.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Country.create(data);
  }
}

module.exports = CountriesSeeder;
