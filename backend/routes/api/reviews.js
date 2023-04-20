const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth')


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();


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


        res.json({"Reviews": reviewList})



    }




)

router.post('/:reviewId/images',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();

        let review = await Review.findByPk(req.params.reviewId)
        const { url } = req.body

        if (!review) {
            return res.status(404).json({
                "message": "Review couldn't be found"
            })
        }


        if (review.userId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })

        };

        let oldImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            }
        })

        if (oldImages.length >= 10) {
            return res.status(403).json({
                "message": "Maximum number of images for this resource was reached"

            })
        }


        let newImage = await ReviewImage.create({
            url,
            reviewId: review.id
        })

        newImage = newImage.toJSON()

        delete newImage.updatedAt
        delete newImage.createdAt
        delete newImage.reviewId


        res.json(newImage)




    }


)








router.delete('/:reviewId',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();


        let review = await Review.findByPk(req.params.reviewId)



        if (!review) {
            return res.status(404).json({
                "message": "Review couldn't be found"
            })
        }

        if (review.userId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }

        await review.destroy()


        res.json({
            "message": "Successfully deleted"
        })



    }
)


router.put('/:reviewId',
    requireAuth,
    validateReview,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();

        let thisReview = await Review.findByPk(req.params.reviewId)

        if (!thisReview) {
            return res.status(404).json({
                "message": "Review couldn't be found"
            })
        }

        if (thisReview.userId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }

        const { review, stars } = req.body

        let updatedReview = await thisReview.update({
            review,
            stars
        })


        return res.json(updatedReview)



    }


)








module.exports = router;
