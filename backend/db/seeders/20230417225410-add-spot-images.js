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
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot1img1.png',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot1img2.png',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot1img3.png',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot1img4.png',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot1img5.png',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot2img1.png',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot2img2.png',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot2img3.png',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot2img4.png',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot2img5.png',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot3img1.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot3img2.png',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot3img3.png',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot3img4.png',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot3img5.png',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot4img1.png',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot4img2.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot4img3.png',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot4img4.png',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot4img5.png',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot5img1.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot5img2.png',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot5img3.png',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot5img4.png',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot5img5.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot6img1.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot6img2.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot6img3.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot6img4.png',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot6img5.png',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot7img1.png',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot7img2.png',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot7img3.png',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot7img4.png',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot7img5.png',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot8img1.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot8img2.png',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot8img3.png',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot8img4.png',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot8img5.png',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot9img1.png',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot9img2.png',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot9img3.png',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot9img4.png',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot9img5.png',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot10img1.png',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot10img2.png',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot10img3.png',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot10img4.png',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot10img5.png',
        preview: false,
      },
      {
        spotId: 11,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot11img1.png',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot11img2.png',
        preview: false,
      },
      {
        spotId: 11,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot11img3.png',
        preview: false,
      },
      {
        spotId: 11,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot11img4.png',
        preview: false,
      },
      {
        spotId: 11,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot11img5.png',
        preview: false,
      },
      {
        spotId: 12,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot12img1.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot12img2.png',
        preview: false,
      },
      {
        spotId: 12,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot12img3.png',
        preview: false,
      },
      {
        spotId: 12,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot12img4.png',
        preview: false,
      },
      {
        spotId: 12,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot12img5.png',
        preview: false,
      },
      {
        spotId: 13,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot13img1.png',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot13img2.png',
        preview: false,
      },
      {
        spotId: 13,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot13img3.png',
        preview: false,
      },
      {
        spotId: 13,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot13img4.png',
        preview: false,
      },
      {
        spotId: 13,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot13img5.png',
        preview: false,
      },
      {
        spotId: 14,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot14img1.png',
        preview: true,
      },
      {
        spotId: 14,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot14img2.png',
        preview: false,
      },
      {
        spotId: 14,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot14img3.png',
        preview: false,
      },
      {
        spotId: 14,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot14img4.png',
        preview: false,
      },
      {
        spotId: 14,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot14img5.png',
        preview: false,
      },
      {
        spotId: 15,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot15img1.png',
        preview: true,
      },
      {
        spotId: 15,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot15img2.png',
        preview: false,
      },
      {
        spotId: 15,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot15img3.png',
        preview: false,
      },
      {
        spotId: 15,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot15img4.png',
        preview: false,
      },
      {
        spotId: 15,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot15img5.png',
        preview: false,
      },
       {
        spotId: 16,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot16img1.png',
        preview: true,
      },
      {
        spotId: 16,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot16img2.png',
        preview: false,
      },
      {
        spotId: 16,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot16img3.png',
        preview: false,
      },
      {
        spotId: 16,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot16img4.png',
        preview: false,
      },
      {
        spotId: 16,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot16img5.png',
        preview: false,
      },
       {
        spotId: 17,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot17img1.png',
        preview: true,
      },
      {
        spotId: 17,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot17img2.png',
        preview: false,
      },
      {
        spotId: 17,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot17img3.png',
        preview: false,
      },
      {
        spotId: 17,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot17img4.png',
        preview: false,
      },
      {
        spotId: 17,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot17img5.png',
        preview: false,
      },
       {
        spotId: 18,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot18img1.png',
        preview: true,
      },
      {
        spotId: 18,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot18img2.png',
        preview: false,
      },
      {
        spotId: 18,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot18img3.png',
        preview: false,
      },
      {
        spotId: 18,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot18img4.png',
        preview: false,
      },
      {
        spotId: 18,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot18img5.png',
        preview: false,
      },
       {
        spotId: 19,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot19img1.png',
        preview: true,
      },
      {
        spotId: 19,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot19img2.png',
        preview: false,
      },
      {
        spotId: 19,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot19img3.png',
        preview: false,
      },
      {
        spotId: 19,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot19img4.png',
        preview: false,
      },
      {
        spotId: 19,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot19img5.png',
        preview: false,
      },
       {
        spotId: 20,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot20img1.png',
        preview: true,
      },
      {
        spotId: 20,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot20img2.png',
        preview: false,
      },
      {
        spotId: 20,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot20img3.png',
        preview: false,
      },
      {
        spotId: 20,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot20img4.png',
        preview: false,
      },
      {
        spotId: 20,
        url: 'https://everetsybucket.s3.us-west-1.amazonaws.com/spot20img5.png',
        preview: false,
      },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: true,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: false,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: false,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: false,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: false,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: ,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: ,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: ,
      // },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: ,
      // },
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
