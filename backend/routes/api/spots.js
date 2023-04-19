const express = require('express')

const { Spot, Review, SpotImage, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth')





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
            spot.avgRating = starTotal / spot.Reviews.length
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
    async (req, res) => {
        const {address, city, state, country, lat , lng, name, description, price} = req.body
        const { user } = req

        let person = user.toJSON()

        const newSpot = await Spot.create({
            ownerId: person.id,
            address: address,
            cit: city,
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













module.exports = router;
