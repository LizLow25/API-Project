'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

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
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName:  'Turtle',
        lastName:  'Cat',
        email: 'turtle@user.io',
        username: 'TurtlyTeensk',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Shadow',
        lastName: 'Cat',
        email: 'shadow@user.io',
        username: 'BabyShadow',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Beezy',
        lastName: 'Cat',
        email: 'beezy@user.io',
        username: 'MissBeez',
        hashedPassword: bcrypt.hashSync('password3')
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['TurtlyTeensk', 'BabyShadow', 'MissBeez'] }
    }, {});


  }
};
