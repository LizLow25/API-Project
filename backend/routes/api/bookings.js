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



        res.json({ "Bookings": bookingsList })


    }



)


router.put('/:bookingId',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();


        let booking = await Booking.findByPk(req.params.bookingId)

        if (!booking) {
            return res.status(404).json({
                "message": "Booking couldn't be found"
            })
        }

        if (booking.userId !== person.id) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }


        let bookedList = await Booking.findAll({
            where: {
                spotId: booking.spotId
            }
        })


        //let bookedStart = booking.startDate.toDateString()
        let bookedEnd = booking.endDate.toDateString()

        //let bookedStartObj = new Date(bookedStart);
        let bookedEndObj = new Date(bookedEnd);

        //let bookedStartTime = bookedStartObj.getTime()
        let bookedEndTime = bookedEndObj.getTime()

        //if ()


        if (bookedEndTime < Date.now()) {
            return res.status(404).json({
                "message": "Past bookings can't be modified"
            })

        }





        let { startDate, endDate } = req.body

        let reqStartObj = new Date(startDate)
        let reqEndObj = new Date(endDate)
        let reqStartTime = reqStartObj.getTime()
        let reqEndTime = reqEndObj.getTime()

        if (reqStartTime >= reqEndTime) {
            return res.status(400).json({
                "message": "Bad Request",
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
        }
        let bookingsList = [];

        bookedList.forEach(booking => {
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
            if (reqStartTime >= startBookedTime && reqStartTime <= endBookedTime && booking.userId !== person.id) {

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







        const updatedBooking = await booking.update({
            startDate,
            endDate
        })


        res.json(updatedBooking)



    }


)

router.delete('/:bookingId',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        let person = user.toJSON();

        let booking = await Booking.findByPk(req.params.bookingId, {
            include: [{model: Spot}]
        })

        if (!booking) {
            return res.status(404).json({
                "message": "Booking couldn't be found"
            })
        }

        let bookedStartDate = booking.startDate.toDateString()
        let bookedStartObj = new Date(bookedStartDate)
        let bookedStartTime = bookedStartObj.getTime()

        // if(bookedStartTime <= Date.now()) {
        //     res.status(403).json({
        //         "message": "Bookings that have been started can't be deleted"
        //       })
        // }


        // if (person.id !== booking.userId || person.id !== booking.Spot.ownerId) {
        //     return res.status(403).json({
        //         "message": "Forbidden"
        //     })
        // }

        await booking.destroy()


        res.json({
            "message": "Successfully deleted"
          })




    }



)












module.exports = router;
