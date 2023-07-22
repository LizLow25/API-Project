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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47160631/original/36d3a1ae-5760-45c7-83c4-dfae0e01963c.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47160631/original/38616ea5-4917-4e1a-8202-b23f9aa0abd3.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47160631/original/9f83ed26-b146-4fb5-a2af-3d5e406331da.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47160631/original/301618f2-ee18-47cb-b7c3-8af302e30198.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47160631/original/301618f2-ee18-47cb-b7c3-8af302e30198.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/20888646/a28f189d_original.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/d32e9321-dad0-42f8-abd1-49ef56d39936.jpg?im_w=1200',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/66997309/578244d9_original.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/5d6c1726-205f-4367-b7fe-9432691b32dc.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/20894636/e5584b39_original.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20812370/original/ce34e54d-2085-4dd8-835c-2fb4b453b88d.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20812370/original/e6c6d885-0803-43fb-8431-e1a774afe565.jpeg?im_w=1200',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/4c8e96ed-8a7b-430c-9773-d56c09bb8c5d.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/2df0354f-ac3e-4ae5-a4fd-22f5925ef544.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/402be074-12c4-4a2c-914d-dc16430ae89f.jpg?im_w=1200',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/1e292c98-0a71-4323-abbf-972397812c29.jpg?im_w=1200',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/396aa09f-1d52-434c-83dc-7a5390dd5633.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/e66dfca9-8154-4c84-aa4a-d3b3fa645848.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/79729b15-816f-4e88-af61-d36764116832.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53575727/original/1310e233-0cd1-45e5-8ac9-dff154ebd567.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/7aaab327-951e-43b5-aa78-07c197381bcd.jpg?im_w=1200',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/d15f941a-50d3-4154-b6bd-d57e4461d9bc.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/e32e3afa-a853-4d45-a89f-2d92e1de7a12.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/691deafa-7af1-414d-bb46-0b71a236f029.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/4f2b43b4-1968-4575-b157-5e0e5be0d1f5.jpg?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48702041/original/005846e6-7f52-4ec9-b0f3-d99b8c25f861.png?im_w=1200',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48702041/original/2b57e07c-2316-4cd2-8102-23615a51bdc3.png?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48702041/original/eaa366e5-4386-475a-8b81-3e18410ee61e.png?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48702041/original/d22e6f2d-23dc-4c56-82fb-5e9e49c742b0.png?im_w=720',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48702041/original/e0ce1b07-9f82-4b9d-8191-95be5e22f90d.png?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665186824025123182/original/e6f4e6a4-c3fa-4de0-85e7-6d35eebde745.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665186824025123182/original/04fe3ed6-a321-4c1b-8d15-92e5fbb6a278.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665186824025123182/original/fd85ef1b-a1ba-4157-b739-dd78885ddaaf.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665186824025123182/original/40ce29bf-6c45-4fa7-bc7f-a4f5cb10dea3.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665186824025123182/original/f1bb552b-6d41-4eab-9ca3-90e757be20c6.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49130510/original/9a3bf715-ecd2-41b1-a5b1-6c354f371cb7.jpeg?im_w=1200',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49130510/original/f1c0b03f-7249-42c5-a1f7-81fadcfe77cc.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49130510/original/fc161e57-e38e-4e85-9b98-62061b3d552b.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49130510/original/af951d0d-9ea5-4f09-b09b-9d09f5d9cbc2.jpeg?im_w=720',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49130510/original/209229b3-566d-4c0c-a70e-ebf28a1a0b9b.jpeg?im_w=720',
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
