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



        const spotImage = await SpotImage.findByPk(req.params.imageId, {
            include: [
                {model: Spot}
            ]
        })

        if(!spotImage) {
            return res.status(404).json({
                "message": "Spot Image couldn't be found"
              })
        }

        if (person.id !== spotImage.Spot.ownerId) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }


        await spotImage.destroy()


        res.json({
            "message": "Successfully deleted"
          })



    }



)











module.exports = router;
