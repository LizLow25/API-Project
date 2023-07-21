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
        firstName:  'Alex',
        lastName:  'Hill',
        email: 'Alex@user.io',
        username: 'alex1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sophia',
        lastName: 'Martinez',
        email: 'sophia@user.io',
        username: 'sophia',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Harper',
        lastName: 'Lewis',
        email: 'harper@user.io',
        username: 'harper',
        hashedPassword: bcrypt.hashSync('password')
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
      username: { [Op.in]: ['alex', 'sophia', 'harper'] }
    }, {});


  }
};
