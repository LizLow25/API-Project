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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date(2023, 5, 7),
        endDate: new Date(2023, 5, 10)
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(2023, 5, 11),
        endDate: new Date(2023, 5, 13)
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date(2023, 5, 15),
        endDate: new Date(2023, 5, 18)
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});


  }
};
