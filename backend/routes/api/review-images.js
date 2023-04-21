const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { requireAuth, restoreUser } = require('../../utils/auth')


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')


const router = express.Router();



router.delete('/:imageId',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();

        const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
            include: [
                {model: Review}
            ]
        })


        if (!reviewImage) {
            return res.status(404).json({
                "message": "Review Image couldn't be found"
              })
        }

        if (reviewImage.Review.userId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }

        await reviewImage.destroy()


        res.json({
            "message": "Successfully deleted"
          })



    }



)














module.exports = router;
