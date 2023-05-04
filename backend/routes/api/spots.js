const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { requireAuth, restoreUser } = require('../../utils/auth')
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')


const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]



const router = express.Router();



router.get('/',
    async (req, res) => {
        let errors = {};




        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        let pagination = {}
        let where = {};




        if (!page) page = 1
        if (!size) size = 20

        if (page >= 1 && size >= 1 && size <= 20 && page <= 10) {
            pagination.limit = size;
            pagination.offset = size * (page - 1);
        }

        if (page <= 0) {
            errors.page = "Page must be greater than or equal to 1"

        }

        if (page > 10) {
            errors.page = "Page must be less than or equal to 10"

        }

        if (size <= 0) {

            errors.page = "Size must be greater than or equal to 1"


        }

        if (size > 20) {

            errors.page = "Size must be less than or equal to 20"

        }




        //check latitude
        if (minLat && !maxLat) {
            if (minLat >= -90 && minLat <= 90) {
                where.lat = { [Op.gte]: minLat }
            } else {
                errors.minLat = "Minimum latitude is invalid"
            }
        };
        if (maxLat && !minLat) {
            if (maxLat >= -90 && maxLat <= 90) {
                where.lat = { [Op.lte]: maxLat }
            } else {
                errors.maxLat = "Maximum latitude is invalid"
            }
        };
        if (maxLat && minLat) {
            if ((minLat >= -90 && minLat <= 90) && (maxLat >= -90 && maxLat <= 90)) {
                where.lat = { [Op.between]: [minLat, maxLat] }
            } else {
                errors.minLat = "Minimum latitude is invalid";
                errors.maxLat = "Maximum latitude is invalid"
            }
        };

        //check longitude
        if (minLng && !maxLng) {
            if (minLng >= -180 && minLng <= 180) {
                where.lng = { [Op.gte]: minLng }
            } else {
                errors.minLng = "Minimum longitude is invalid"
            }
        };
        if (maxLng && !minLng) {
            if (maxLng >= -180 && maxLng <= 180) {
                where.lng = { [Op.lte]: maxLng }
            } else {
                errors.maxLng = "Maximum longitude is invalid"
            }
        };
        if (maxLng && minLng) {
            if ((minLng >= -180 && minLng <= 180) && (maxLng >= -180 && maxLng <= 180)) {
                where.lng = { [Op.between]: [minLng, maxLng] }
            } else {
                errors.minLng = "Minimum longitude is invalid";
                errors.maxLng = "Maximum longitude is invalid"
            }
        }

        //check price
        if (minPrice && !maxPrice) {
            if (minPrice >= 0) {
            where.price = { [Op.gte]: minPrice }
            } else {
                errors.minPrice = "Minimum price must be greater than or equal to 0"
            }
        };
        if (maxPrice && !minPrice) {
            if (maxPrice >= 0) {
            where.price = { [Op.lte]: maxPrice }
            } else {
                errors.maxPrice = "Maximum price must be greater than or equal to 0"
            }
        };
        if (maxPrice && minPrice) {
            if (minPrice >= 0 && maxPrice >= 0) {
            where.price = { [Op.between]: [minPrice, maxPrice] }
            } else {
                errors.maxPrice = "Maximum price must be greater than or equal to 0"
                errors.minPrice = "Minimum price must be greater than or equal to 0"
            }
        }







        if (Object.keys(errors).length) {
            return res.status(400).json({ "message": "Bad Request", "errors": errors })
        }



        let spotList = []

        const spots = await Spot.findAll({
            where,
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                }
            ],
            ...pagination,

        })

        spots.forEach(spot => {
            spotList.push(spot.toJSON())
        })


        spotList.forEach(spot => {
            let starTotal = 0
            spot.Reviews.forEach(review => {
                starTotal += review.stars
            })
            spot.avgRating = starTotal / spot.Reviews.length

            delete spot.Reviews


        })

        spotList.forEach(spot => {
            spot.previewImage = null

            spot.SpotImages.forEach(image => {
                spot.previewImage = image.url
            })

            delete spot.SpotImages
        })





        page = parseInt(page);
        size = parseInt(size);


        res.json({ "Spots": spotList, page, size })

    }
)

router.get('/current',
    requireAuth,
    async (req, res) => {
        const { user } = req

        let person = user.toJSON()

        //console.log(person)

        let spotList = []

        const spots = await Spot.findAll({
            where: {
                ownerId: person.id
            },
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                }
            ]
        })

        spots.forEach(spot => {
            spotList.push(spot.toJSON())
        })


        spotList.forEach(spot => {
            let starTotal = 0
            spot.Reviews.forEach(review => {
                starTotal += review.stars
            })
            spot.avgRating = starTotal / spot.Reviews.length

            delete spot.Reviews


        })

        spotList.forEach(spot => {

            spot.SpotImages.forEach(image => {
                spot.previewImage = image.url
            })

            delete spot.SpotImages
        })




        res.json(spotList)

    }


)


router.get('/:spotId',
    async (req, res) => {

        let spot = await Spot.findByPk(req.params.spotId, {
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                },
                {
                    model: User,
                    as: "Owner"
                }
            ]


        })

        if (spot) {

            spot = spot.toJSON()


            let starTotal = 0
            spot.Reviews.forEach(review => {
                starTotal += review.stars
            })
            spot.avgStarRating = starTotal / spot.Reviews.length
            spot.numReviews = spot.Reviews.length

            delete spot.Reviews

            spot.SpotImages.forEach(image => {
                delete image.spotId;
                delete image.createdAt;
                delete image.updatedAt;

            })

            delete spot.Owner.username



            res.json(spot)
        } else {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }



    })

router.post('/',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const { user } = req

        let person = user.toJSON()

        let newSpot = await Spot.create({
            ownerId: person.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price

        })

        res.json(newSpot)




    }

)

router.post('/:spotId/images',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId)

        const { url, preview } = req.body
        const { user } = req

        let person = user.toJSON()

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }

        if (spot.ownerId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })

        }

        let newSpot = await SpotImage.create({
            spotId: spot.id,
            url: url,
            preview: preview
        })

        newSpot = newSpot.toJSON()

        delete newSpot.spotId;
        delete newSpot.updatedAt;
        delete newSpot.createdAt;

        res.json(newSpot)



    }


)

router.put('/:spotId',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        const { user } = req;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        let person = user.toJSON();

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        if (spot.ownerId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })

        };

        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        res.json(spot)

    }


)


router.delete('/:spotId',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        const { user } = req;
        let person = user.toJSON();

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        if (spot.ownerId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })

        };

        await spot.destroy();

        res.json({
            "message": "Successfully deleted"
        })

    }
)


router.get('/:spotId/reviews',
    async (req, res) => {

        let spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                { model: User },
                { model: ReviewImage }
            ]
        })

        let reviewList = [];

        reviews.forEach(review => {
            reviewList.push(review.toJSON())

        });

        reviewList.forEach(review => {

            delete review.User.username

            let reviewimages = review.ReviewImages

            reviewimages.forEach(image => {

                delete image.reviewId
                delete image.createdAt
                delete image.updatedAt

            })


        })


        res.json({"Reviews": reviewList})


    }

)


router.post('/:spotId/reviews',
    requireAuth,
    validateReview,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        const { user } = req;
        let person = user.toJSON();

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        let prevReview = await Review.findAll({
            where: {
                userId: person.id,
                spotId: spot.id
            }
        })



        if (prevReview.length) {
            //kanban says 403 status and readme says 500 status??
            return res.status(500).json({
                "message": "User already has a review for this spot"
            })
        }

        const { review, stars } = req.body


        let newReview = await Review.create({
            userId: person.id,
            spotId: spot.id,
            review,
            stars

        })


        res.json(newReview)
    }



)


router.get('/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        let bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [
                { model: User }
            ]
        })

        if (!bookings.length) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }


        let bookingsList = [];

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())

        });



        if (person.id !== spot.ownerId) {

            bookingsList.forEach(booking => {

                delete booking.id;
                delete booking.userId;
                delete booking.createdAt;
                delete booking.updatedAt;
                delete booking.User

            })

            return res.json({ "Bookings": bookingsList })


        }

        if (person.id === spot.ownerId) {
            bookingsList.forEach(booking => {

                delete booking.User.username

            })

            return res.json({ "Bookings": bookingsList })


        }




    }


)

router.post('/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();
        const spot = await Spot.findByPk(req.params.spotId)


        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        if (person.id === spot.ownerId) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }



        let { startDate, endDate } = req.body


        let reqStartObj = new Date(startDate)
        let reqEndObj = new Date(endDate)

        let reqStartTime = reqStartObj.getTime()
        let reqEndTime = reqEndObj.getTime()

        //console.log(reqStartTime, reqEndTime)

        if (reqStartTime >= reqEndTime) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
        }



        let bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            }
        })

        let bookingsList = [];

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())

        });

        for (let booking of bookingsList) {
            let start = booking.startDate.toDateString()
            let end = booking.endDate.toDateString()

            let startD = new Date(start)
            let endD = new Date(end)

            let startBookedTime = startD.getTime()
            let endBookedTime = endD.getTime()

            //if the requested start date is inside another booking, res.json(error)
            if (reqStartTime >= startBookedTime && reqStartTime <= endBookedTime) {

                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking"
                    }
                })

            }
            //if the requested end date is inside another booking
            if (reqEndTime >= startBookedTime && reqEndTime <= endBookedTime) {

                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                        "endDate": "End date conflicts with an existing booking"
                    }
                })

            }


        }

        let newBooking = await Booking.create({
            startDate,
            endDate,
            spotId: req.params.spotId,
            userId: person.id
        })


        return res.json(newBooking)


    }


)





module.exports = router;
