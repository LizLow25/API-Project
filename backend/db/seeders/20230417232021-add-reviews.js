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
        review: 'The view is wonderful. It cannot be described because of the beauty of nature, the house is excellent, all the service requirements are available inside the house. Big thanks to the homeowner. I hope to return to this house again',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: "This Airbnb is beautiful, and I highly recommend it for outdoorsy people. Like the listing says, be aware that there will be bugs (lots of ants, and quite a few roaches) and also like the listing says, there is no AC, so it will be hot (we are visiting during the hottest months of the year, and weren’t quite prepared) If these two things don’t bother you, this place is perfect.",
        stars: 4,
      },
      {
        spotId: 1,
        userId: 5,
        review: 'A beautiful escape! Wonderful hosts and a beautiful community. We really enjoyed the quiet, privacy, beach walks, and dinners from Luna del Mar. Would recommend!',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 6,
        review: "We thoroughly enjoyed our stay at Alex's place. It was as described and exceeded our expectations. One reviewer mentioned the roosters that are loud early in the morning and that is definitely accurate but it made for some pretty amazing early morning star gazing. We definitely want to come back!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "The accommodations were amazing in every way! Lots of extras were provided such as fresh cookies, a Berkey water filter, etc. The hosts were super friendly and helpful and even provided local points of interest. We wish we would've had more time to enjoy..definitely would stay again!",
        stars: 3,
      },
      {
        spotId: 2,
        userId: 2,
        review: "This place is so unique and peaceful one can never find in a hotel, it is a perfect airbnb find on our way to Yellowstone and Grand Teton. We appreciated the hospitality and the craftsmanship by the owners. Kids wanted to come again to see the sunset and use the bonfire. Highly recommend!",
        stars: 4,
      },
      {
        spotId: 2,
        userId: 5,
        review: "We hated to leave this place, and can't possibly say enough good things about it. We are discussing plans to return again already and we've only left a few hours ago.",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 8,
        review: "Slice of paradise!! Such a peaceful place, and the views are outstanding!",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 3,
        review: "My girlfriend and I had an awesome experience! The stars are so clear from the chairs or from the hot tub! Nice place to get away from it all and relax!",
        stars: 4,
      },
      {
        spotId: 3,
        userId: 1,
        review: "Probably the greatest scenery for any of the Airbnbs I've stayed in before. This place is a true gem for a weekend getaway! My only complaint would be that the shower wasn't the most pleasant. Low water pressure, short ceiling, and didn't always have warm water. Despite these comments, it was still an incredible house to stay at! I would certainly go back:)",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 5,
        review: "This was one of the best getaways to the mountains I’ve ever had. A Very home like feeling with the tiny home.",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 6,
        review: "So sad that this was just a one night stop for us. It was so peaceful and exactly what we needed. The bed was extremely comfortable and the interior design was so thoughtful. We were rained out so no fire for us, but the hot tub was a great way to end the evening. We brought board games and played while listening to music on the record player.",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 6,
        review: "This was a last minute booking. Great place. I fell in love! I will be back to try some wine! Thank you!",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 7,
        review: "Great place to stay! The cutest vineyard. The room was impeccably clean and very cute! Highly recommend!",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 8,
        review: "Actual paradise nestled in the middle of the desert. Sophia has created the perfect spot to relax and unwind after a long day hiking in the local parks. We enjoyed two evenings here and it wasn’t enough! Enjoyed sitting by the firepit and taking in the incredible scenery. We were lucky to experience a rare desert thunderstorm on our last night. ",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 1,
        review: "Spent the night here for one night while traveling through Death Valley and I absolutely loved it. I am always on the lookout for unique stays and this definitely met the requirements!",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 2,
        review: "Beautiful place, close to the beach. Beds are comfortable and has all the essentials you need, beach and kitchen.",
        stars: 4,
      },
       {
        spotId: 5,
        userId: 5,
        review: "Great place and very homey! A beautiful yet quiet neighborhood, walking distance to multiple restaurants and beautiful view of beach.",
        stars: 5,
      },
       {
        spotId: 5,
        userId: 6,
        review: "We loved this little gem. We had a wonderful get away. It was clean and Alex was extremely responsive. He provided recommendations for restaurants near-by and things to do. The location is perfect-literally steps away from the bay as well as the ocean.",
        stars: 5,
      },
       {
        spotId: 5,
        userId: 7,
        review: "Very clean and great location. I totally recommend this place 🐬",
        stars: 5,
      },
       {
        spotId: 6,
        userId: 2,
        review: "Loved our stay here! The hosts were very responsive. The place was very peaceful and super clean. Highly recommend!",
        stars: 4,
      },
       {
        spotId: 6,
        userId: 3,
        review: "We were looking for a very quiet and relaxing get away and this place was perfect.",
        stars: 4,
      },
       {
        spotId: 6,
        userId: 6,
        review: "Perfect place to get away for the weekend with some friends. Beds were comfy, and we had everything we could have needed! Very nicely stocked kitchen with coffee, creamer, spices, and condiments. Would love to come back!",
        stars: 5,
      },
       {
        spotId: 6,
        userId: 8,
        review: "Our stay left us needing nothing and wanting to stay longer. Such a thoughful, relaxing space with all the comforts. Hot tub was clean and relaxing. Thanks for the wonderful stay, we will be back!",
        stars: 5,
      },
       {
        spotId: 7,
        userId: 6,
        review: "Perfect cabin for out West. This property was in great shape, loved sitting outside and listening to the wagon wheel waterfall and having a wonderful smelling fire. ",
        stars: 4,
      },
       {
        spotId: 7,
        userId: 2,
        review: "Absolutely love this AirRV. The art work and wood work was absolutely incredible. The hosts were amazing. They provided everything we needed plus some. I love the robes.",
        stars: 5,
      },
       {
        spotId: 7,
        userId: 3,
        review: "Great place to stay right outside of the Grand Canyon! It was a beautiful home and it was very peaceful. The hottub and out door space were super nice!",
        stars: 5,
      },
       {
        spotId: 7,
        userId: 5,
        review: "Wow this place was truly gorgeous. It was a tad tricky finding it, we're not from Arizona nor familiar with these beautiful surroundings, but the instructions on the description did help us find the home. ",
        stars: 3,
      },
       {
        spotId: 8,
        userId: 6,
        review: "Nice cozy place to stay. The host made us feel right at home. Definitely would stay again if we come back to Twin Falls.",
        stars: 5,
      },
      {
        spotId: 8,
        userId: 7,
        review: "Place was great! Host was amazing. This was a pleasant and comfortable experience. I will definitely keep in mind for next time. I appreciated everything!",
        stars: 5,
      },
      {
        spotId: 8,
        userId: 8,
        review: "Great place for a getaway… going to use this place & host again 🌻",
        stars: 4,
      },
      {
        spotId: 8,
        userId: 5,
        review: "A great value in Twin Falls. The unit is very comfortable. It is near an agricultural area and the outside air smells according so we stayed inside.",
        stars: 3,
      },
      // {
      //   spotId: 4,
      //   userId: 6,
      //   review: "",
      //   stars: 5,
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
