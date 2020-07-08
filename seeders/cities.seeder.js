var Seeder = require("mongoose-data-seed").Seeder;
var City = require("../models/city");
var shared = require("../models/shared");

async function getData() {
  return [
    {
      name: "Algiers",
      country: await shared.getAlgeriaId(),
    },
    {
      name: "Annaba",
      country: await shared.getAlgeriaId(),
    },
    {
      name: "Elbasan",
      country: await shared.getAlbaniaId(),
    },
    {
      name: "Petran",
      country: await shared.getAlbaniaId(),
    },
    {
      name: "Shkoder",
      country: await shared.getAlbaniaId(),
    },
  ];
}


 class CitiesSeeder extends Seeder {
  async shouldRun() {
    return City.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return City.create(getData());
  }
};

module.exports = CitiesSeeder;
