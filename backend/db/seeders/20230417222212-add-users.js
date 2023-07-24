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
        image:'https://everetsybucket.s3.us-west-1.amazonaws.com/user1.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sophia',
        lastName: 'Martinez',
        email: 'sophia@user.io',
        username: 'sophia',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user2.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Harper',
        lastName: 'Lewis',
        email: 'harper@user.io',
        username: 'harper',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user3.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'demo1',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user4.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Matthew',
        lastName: 'Clark',
        email: 'matthew@user.io',
        username: 'matthew',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user5.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ava',
        lastName: 'Taylor',
        email: 'ava@user.io',
        username: 'ava123',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user6.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Charlotte',
        lastName: 'Scott',
        email: 'charlotte@user.io',
        username: 'charlotte',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user7.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ethan',
        lastName: 'Wilson',
        email: 'ethan@user.io',
        username: 'ethan',
        image: 'https://everetsybucket.s3.us-west-1.amazonaws.com/user8.png',
        hashedPassword: bcrypt.hashSync('password')
      },

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
