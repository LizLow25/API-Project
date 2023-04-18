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
        address: '123 Sparrow Lane',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'The Birdwatching House',
        description: 'A good place to see the local fauna.',
        price: 300.99
      },
      {
        ownerId: 1,
        address: '123 Mouse Lane',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'The Mousewatching House',
        description: 'A good place to see some more local fauna.',
        price: 300.99
      },
      {
        ownerId: 1,
        address: '123 Cricket Lane',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: 104.9903,
        name: 'The Cricketwatching House',
        description: 'A good place to see some local insects.',
        price: 300.99
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
