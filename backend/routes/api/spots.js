const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { requireAuth, restoreUser } = require('../../utils/auth')


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

        let spotList = []

        const spots = await Spot.findAll({
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


        res.json(reviewList)


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

        if (person.id === spot.ownerId) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

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
