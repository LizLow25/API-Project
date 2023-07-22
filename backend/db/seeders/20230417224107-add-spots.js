'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
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
        address: '50308 Pura Vida Lane',
        city: 'Tierras Morenas',
        state: 'Guanacaste',
        country: 'Costa Rica',
        lat: 10.4317,
        lng: 85.7846,
        name: 'Costa Rican Mountain Retreat',
        description: 'Experience pura vida in the Costa Rican mountains.',
        price: 20.99
      },
      {
        ownerId: 1,
        address: '472 Prairiedog Road',
        city: 'Moose',
        state: 'WY',
        country: 'USA',
        lat: 43.6558,
        lng: 110.7183,
        name: 'Partially Restored 1920s Sheep Wagon',
        description: 'Rent your mobile dreamhome and go offroad in the wilds of Wyoming.',
        price: 70.99
      },
      {
        ownerId: 2,
        address: '275 Marionberry Street',
        city: 'Asheville',
        state: 'NC',
        country: 'USA',
        lat: 35.5951,
        lng: 82.5515,
        name: "Hippie Retreat in the NC Moutains",
        description: 'Come read colorful books with your hip friends.',
        price: 40.99
      },
      {
        ownerId: 2,
        address: '3456 Cacti Lane',
        city: 'Armagosa Valley',
        state: 'NV',
        country: 'USA',
        lat: 36.6438,
        lng: 116.4003,
        name: "Glamping Near Death Valley",
        description: 'Star watch and listen to the silence in the Nevada desert.',
        price: 80.50
      },
      {
        ownerId: 1,
        address: '8238 Pelican Place',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.7157,
        lng: 117.1611,
        name: 'Beachside Airstream Retreat',
        description: 'Live the beach life in sunny San Diego.',
        price: 212
      },
      {
        ownerId: 1,
        address: '5060 Cornflower Circle',
        city: 'Silver Creek',
        state: 'WA',
        country: 'USA',
        lat: 46.5254,
        lng: 122.5904,
        name: 'VanLife on Mayfield Lake',
        description: 'Get closer to nature on a nine acre private retreat.',
        price: 175
      },
      {
        ownerId: 1,
        address: '745 Callisto Lane',
        city: 'Williams',
        state: 'AZ',
        country: 'USA',
        lat: 35.2495,
        lng: 112.1910,
        name: 'Stargazing in the Desert',
        description: 'This special retreat offers a radiotelescope and free gummy bears.',
        price: 250
      },
      {
        ownerId: 1,
        address: '745 Rapids Road',
        city: 'Twin Falls',
        state: 'ID',
        country: 'USA',
        lat: 42.5558,
        lng: 114.4701,
        name: 'Funky Retreat Under Idaho Skies',
        description: 'Enjoy glamping near a college town.',
        price: 165
      },
      {
        ownerId: 2,
        address: '3141 Secret Garden Way',
        city: 'Sandy Valley',
        state: 'NV',
        country: 'USA',
        lat: 35.8169,
        lng: 115.6322,
        name: 'Conestoga Wagon on Dude Ranch NEAR LAS VEGAS',
        description: 'Experience this awesome, authentic covered wagon located at Sandy Valley Ranch. We are located only 45 minutes away from Las Vegas. If you are looking for a fun little family get away, this is the perfect place. Enjoy the activities offered at our ranch including cowboy for a day, horse rides, cattle drives, rodeos and lots more!',
        price: 127
      },
      {
        ownerId: 2,
        address: '2222 Rainbow Avenue',
        city: 'Roswell',
        state: 'NM',
        country: 'USA',
        lat: 33.3943,
        lng: 104.5230,
        name: 'True Cold War Relic Atlas F Missile Silo / Bunker',
        description: 'The Missile Base / Bunker property with its former upper level underground Launch Control Center as your PRIVATE APARTMENT and a Utility Tunnel that leads to the Missile Silo nearly 186 feet deep, with much of its original floors still intact. Learn what it took to operate one of these amazing sites. The major construction/refurbishment areas, have been renovated into an unbelievable underground home and office. Prepare for one of the most awesome tours included with the cost of your stay.',
        price: 515
      },
      {
        ownerId: 3,
        address: '9999 Blissful Lane',
        city: 'Fernwood',
        state: 'ID',
        country: 'USA',
        lat: 47.1122,
        lng: 116.3931,
        name: 'Crystal Peak Lookout 🌲',
        description: 'The lookout is open year round with a wood fired stove to keep warm at night or heat your morning coffee. A wood fired sauna sits below to relax and rejuvenate your body after a big hike or snowshoeing adventure. What is that other little wooden building? No fire lookout is complete without an outhouse!',
        price: 200
      },
      {
        ownerId: 3,
        address: '6666 Mystical Lane',
        city: 'Coconino County',
        state: 'AZ',
        country: 'USA',
        lat: 35.6648,
        lng: 111.4753,
        name: 'The Kyo͞ob at Shash Dine',
        description: "Yá'át'ééh (Hello in Navajo). We are a Native American owned large acreage working sheep ranch and off grid B&B offering guests a unique stay at our ranch utilizing quality canvas bell tents, covered wagons, cabins, and traditional Navajo Hogans on the Navajo Nation. In all there are 9 accommodations nicely spaced in a general area. Our ranch is beautifully located very near all areas of attraction - Antelope Canyon, the town of Page and Lake Powell are 15 minutes drive. Horseshoe Bend is only 5 minutes drive from the ranch. Both the north and south rims of the Grand Canyon are 2 hours. Monument Valley, Bryce, Zion, and Marble Canyon are well within driving distance.",
        price: 309
      },
      {
        ownerId: 3,
        address: '8642 Whispering Pines Drive',
        city: 'Fredericksburg',
        state: 'TX',
        country: 'USA',
        lat: 30.2752,
        lng: 98.8720,
        name: 'Enchanted Tree House! Pool - Tub - Off Main St.',
        description: "Imagine being immersed in a small enchanted forest only 100’s of feet off of Main street. Nestled into live oak trees that gently sway in the breeze, under dark skies with bright stars, and curated to both inspire joy and create presence. Welcome to our little magical treehouse and landscape resort in Fredericksburg. The amazing stays in our secluded forest are only minutes to all of the beautiful shops, cafes, restaurants, bars, and Vineyards. A magical stay that we hope you will love.",
        price: 524
      },
      {
        ownerId: 3,
        address: '2468 Stardust Lane',
        city: 'Glen Rose',
        state: 'TX',
        country: 'USA',
        lat: 32.2347,
        lng: 97.7555,
        name: 'THE NEST by Skybox Cabins',
        description: 'At the tip top of the Texas hill country, The Nest offers spectacular views from its perch. Recently featured on the Southern Living website, The Nest is a hybrid cabin with features of both a treehouse and a bohemian bungalow. This truly customized getaway, is filed with wonders from the portal entry to its Texas cedar observatory. Once you arrive at this "Pinterest perfect" cabin, you will never want to leave.',
        price: 308
      },
      {
        ownerId: 3,
        address: '1357 Enchanted Garden Court',
        city: 'Taos',
        state: 'NM',
        country: 'USA',
        lat: 36.4072,
        lng: 105.5734,
        name: 'That 70s Trailer - Boho Bliss - Mountain Views',
        description: 'Set 10 minutes outside of town, this amazingly well-preserved mid-century beauty offers all of the comforts of home in just over 400 carefully designed square feet. Constructed in 1957 by the Spartan Aircraft company, this trailer was meant to be the epitome of modern luxury, with many windows offering expansive views of the mountains and a front row seat to the dramatic weather and sky that make northern New Mexico so enchanting. A huge fenced yard with multiple decks is also yours to enjoy!',
        price: 96
      },
      {
        ownerId: 2,
        address: '1111 Wishing Well Way',
        city: 'Copper Hill',
        state: 'VA',
        country: 'USA',
        lat: 37.0818,
        lng: 80.1342,
        name: 'Apple Ridge Farm Caboose Bed & Breakfast - #3',
        description: 'This charming remodeled Caboose B&B makes the sweetest home away from home stocked with a variety of amenities to help make your stay complete. The main room has a breakfast area complete with mini frig, microwave, coffee maker and toaster so you can enjoy your complimentary breakfast at your leisure in your own room. This main room also has a very comfortable queen sized bed and a futon which folds out into a double sized bed so that 4 guests can stay here. Last, but not least, this caboose has a very spacious bathroom with hair dryer, toiletries, first aid kit, and a large shower stall to help make this stay absolutely wonderful.',
        price: 175
      },
      {
        ownerId: 2,
        address: '1010 Bliss Avenue',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.7157,
        lng: 117.1611,
        name: 'Flea Windmill | The Mill',
        description: "It has a 4000 m garden with sub-tropical fruit trees, garden trees, and flowers. In addition to the Mill ideal for 2 people, it has two more accommodation units: the Mó de Cima's House ideal up to 3 people and the Moleiro's House that hold up tp 4 people.",
        price: 265
      },
      {
        ownerId: 2,
        address: '2468 Stardust Lane',
        city: 'Anchorage',
        state: 'AK',
        country: 'USA',
        lat: 61.2176,
        lng: 149.8997,
        name: 'Snow Igloo',
        description: "Snow igloo with real beds inside. Nice atmosphere with led lights and white walls. Outside the igloo is possibility to see northern lights if you are lucky. Come explore the wilderness. It's always minus degrees' inside the igloo. We provide warm sleeping bag but you should bring your thermos layers, warm hat, socks and gloves. Also headlight or flashlight is handy. Warm apartment available 24 h in case of cold feet.",
        price: 167
      },
      {
        ownerId: 3,
        address: '1357 Secret Haven Court',
        city: 'Portland',
        state: 'ME',
        country: 'USA',
        lat: 43.6591,
        lng: 70.2568,
        name: 'Unique and Secluded AirShip with Breathtaking Highland Views',
        description: "Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows. Airship002 is comfortable, quirky and cool. It does not pretend to be a five star hotel. The reviews tell the story.",
        price: 219
      },
      {
        ownerId: 2,
        address: '3333 Hidden Cove Circle',
        city: 'Joshua Tree',
        state: 'CA',
        country: 'USA',
        lat: 34.1347,
        lng: 116.3131,
        name: 'Guard Tower Suite #1 with Pool',
        description: 'The ULTIMATE "GLAMPING" experience! Featured on HGTV: The Castle House Estate brings Tiny Home living to another level, located in the heart of Joshua Tree and minutes from the National Park. This unique medieval piece of architecture blends indoor-outdoor living with an emphasis on entertaining. The Castle House Estate is situated on eight picturesque acres, surrounded by many more private undeveloped acres.',
        price: 259
      },
      // {
      //   ownerId: ,
      //   address: '',
      //   city: '',
      //   state: '',
      //   country: '',
      //   lat: ,
      //   lng: ,
      //   name: '',
      //   description: '',
      //   price:
      // }




    ], {})


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});

  }
};
