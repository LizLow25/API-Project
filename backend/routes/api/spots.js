const express = require('express')

const { Spot, Review, SpotImage } = require('../../db/models');







const router = express.Router();



router.get('/',
    async (req, res) => {

        let spotList = []

        const spots = await Spot.findAll({
            include : [
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












module.exports = router;
