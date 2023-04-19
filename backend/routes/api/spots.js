const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth')


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
            res.status(404).json({
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
            res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }

        if (spot.ownerId !== person.id) {
            res.status(403).json({
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
            res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        if (spot.ownerId !== person.id) {
            res.status(403).json({
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
            res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        if (spot.ownerId !== person.id) {
            res.status(403).json({
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
            res.status(404).json({
                "message": "Spot couldn't be found"
            })
        };

        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                {model: User},
                {model: ReviewImage}
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


router.post()








module.exports = router;
