const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { requireAuth } = require('../../utils/auth')


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')


const router = express.Router();


router.get('/current',
    requireAuth,
    async (req, res) => {

        const { user } = req;
        let person = user.toJSON();

        const bookings = await Booking.findAll({
            where: {
                userId: person.id
            },
            include: [
                { model: Spot, include: [{ model: SpotImage }] },
            ]
        })


        let bookingsList = [];

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())

        });

        bookingsList.forEach(booking => {

            let images = booking.Spot.SpotImages

            images.forEach(image => {
                booking.Spot.previewImage = image.url
            })

            delete booking.Spot.SpotImages
            delete booking.Spot.createdAt
            delete booking.Spot.updatedAt
            delete booking.Spot.description


        })

       // if (bookings.userId !== person.id) {
        //    return res.status(403).json({
       //         "message": "Forbidden"
       //     })
//}



        res.json({"Bookings": bookingsList})


    }



)














module.exports = router;
