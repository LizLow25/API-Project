const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth')


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();


router.get('/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();

        let reviews = await Review.findAll({
            where: {
                userId: person.id
            },
            include: [
                { model: User },
                { model: Spot, include: [{ model: SpotImage }] },
                { model: ReviewImage }
            ]
        })


        let reviewList = [];

        reviews.forEach(review => {
            reviewList.push(review.toJSON())

        });

        reviewList.forEach(review => {

            let images = review.Spot.SpotImages

            images.forEach(image => {
                review.Spot.previewImage = image.url
            })

            delete review.Spot.SpotImages
            delete review.Spot.createdAt
            delete review.Spot.updatedAt
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








module.exports = router;
