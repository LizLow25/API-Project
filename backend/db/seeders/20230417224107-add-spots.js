'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '50308 Pura Vida Lane',
        city: 'Tierras Morenas',
        state: 'Guanacaste',
        country: 'Costa Rica',
        lat: 10.4317,
        lng: 85.7846,
        name: 'Costa Rican Mountain Retreat',
        description: 'Experience pura vida in the Costa Rican mountains.',
        price: 20.99
      },
      {
        ownerId: 1,
        address: '472 Prairiedog Road',
        city: 'Moose',
        state: 'WY',
        country: 'USA',
        lat: 43.6558,
        lng: 110.7183,
        name: 'Partially Restored 1920s Sheep Wagon',
        description: 'Rent your mobile dreamhome and go offroad in the wilds of Wyoming.',
        price: 70.99
      },
      {
        ownerId: 2,
        address: '275 Marionberry Street',
        city: 'Asheville',
        state: 'NC',
        country: 'USA',
        lat: 35.5951,
        lng: 82.5515,
        name: "Hippie Retreat in the NC Moutains",
        description: 'Come read colorful books with your hip friends.',
        price: 40.99
      },
      {
        ownerId: 2,
        address: '3456 Cacti Lane',
        city: 'Armagosa Valley',
        state: 'NV',
        country: 'USA',
        lat: 36.6438,
        lng: 116.4003,
        name: "Glamping Near Death Valley",
        description: 'Star watch and listen to the silence in the Nevada desert.',
        price: 80.50
      },
      {
        ownerId: 1,
        address: '8238 Pelican Place',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.7157,
        lng: 117.1611,
        name: 'Beachside Airstream Retreat',
        description: 'Live the beach life in sunny San Diego.',
        price: 212
      },
      {
        ownerId: 1,
        address: '5060 Cornflower Circle',
        city: 'Silver Creek',
        state: 'WA',
        country: 'USA',
        lat: 46.5254,
        lng: 122.5904,
        name: 'VanLife on Mayfield Lake',
        description: 'Get closer to nature on a nine acre private retreat.',
        price: 175
      },
      {
        ownerId: 1,
        address: '745 Callisto Lane',
        city: 'Williams',
        state: 'AZ',
        country: 'USA',
        lat: 35.2495,
        lng: 112.1910,
        name: 'Stargazing in the Desert',
        description: 'This special retreat offers a radiotelescope and free gummy bears.',
        price: 250
      },
      {
        ownerId: 1,
        address: '745 Rapids Road',
        city: 'Twin Falls',
        state: 'ID',
        country: 'USA',
        lat: 42.5558,
        lng: 114.4701,
        name: 'Funky Retreat Under Idaho Skies',
        description: 'Enjoy glamping near a college town.',
        price: 165
      },
    ], {})


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});

  }
};
