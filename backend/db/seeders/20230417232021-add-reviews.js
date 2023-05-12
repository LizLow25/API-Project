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

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'I wish to never leave the beautiful mountains of Costa Rica.',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'The birdwatching is impeccable.',
        stars: 4,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Comfortable bed but a strang musty smell. Not a fan.',
        stars: 2,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'I love the smell of woodsmoke and I also love to read by the fire. This spot was perfect!',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 1,
        review: 'There were too many spiders.',
        stars: 1,
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
