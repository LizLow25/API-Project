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

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://revelgear.com/wp-content/uploads/2020/02/VanLifeAnn_cover_mercedes_revelgear_costa_rica_vanlife.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/90/ac.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://media.istockphoto.com/id/1216218328/photo/view-from-bed.jpg?s=612x612&w=0&k=20&c=1_F_dePa9bhFbt2A1_lmE3ry0mSJr4YA8vVFDN0jh_8=',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://i0.wp.com/brookebeyond.com/wp-content/uploads/2020/05/P9242440-1024x768.jpg?ssl=1',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://socalvanlife.com/wp-content/uploads/2022/08/Teton-Van-Pic.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/originals/49/f3/99/49f399a5e6157633f27d74dfb017938d.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.squarespace-cdn.com/content/v1/5626d3a1e4b0fe0e8117d7ac/1614888194492-20EH5EPEF60YKRXXLKDM/IMG_5366.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.squarespace-cdn.com/content/v1/5f3c7f8ab0983c4328c3399d/1636493690570-EQ8ZX8EH3H9WLJM0ROOZ/IMG_3115+2.JPG?format=1000w',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1625492995811-646c41068abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmFubGlmZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        preview: false,
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
