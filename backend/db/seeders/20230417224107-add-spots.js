'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
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
        city: 'Playa Flamingo',
        state: 'Guanacaste',
        country: 'Costa Rica',
        lat: 10.4317,
        lng: 85.7846,
        name: 'Costa Rica Beachfront Van',
        description: 'Experience pura vida on the shores of the Pacific ocean.',
        price: 20.99
      },
      {
        ownerId: 1,
        address: '472 Snowshoe Lane',
        city: 'Moose',
        state: 'WY',
        country: 'USA',
        lat: 43.6558,
        lng: 110.7183,
        name: 'Vanlife in the Grand Tetons',
        description: 'Rent your mobile dreamhome and go offroad in the wilds of Wyoming.',
        price: 70.99
      },
      {
        ownerId: 2,
        address: '275 Marionberry Lane',
        city: 'Forks',
        state: 'WA',
        country: 'USA',
        lat: 47.9504,
        lng: 124.3855,
        name: "Vanlife on Washington's Olympic Peninsula",
        description: 'Explore the mysteries and wonder of a temperate rainforest.',
        price: 40.99
      }
    ], {})


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['Denver'] }
    }, {});


  }
};
