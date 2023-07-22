import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import SpotCard from "../SpotCard";
import { Link } from 'react-router-dom'

function Bookings() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.user.Bookings);

    console.log('bookings', bookings)

    const deleteBookingClick = async (id) => {
        await dispatch(deleteBookingThunk(id))
        await dispatch(getUserBookingsThunk())
    }



    useEffect(() => {
        dispatch(getUserBookingsThunk());

    }, [dispatch]);

    return (
        <div>
            <h2>Trips</h2>
            <div className='landingpage'>


                {bookings?.map((booking) => (
                    <div key={booking.id}>
                        <Link to={`/spots/${booking.Spot.id}`} className='spotlink'
                        >

                            <SpotCard
                                spot={booking.Spot}
                                spotPrice={booking.Spot.price}
                            />
                            <p>

                            </p>

                        </Link>
                        {new Date(booking.startDate).toUTCString().slice(4, 16)} - {new Date(booking.endDate).toUTCString().slice(4, 16)}
                        {new Date() < new Date(booking.startDate).getTime() ? (
                            <div className="booking-spot-card-button-container">
                                <button>Update</button>
                                <button onClick={() => deleteBookingClick(booking.id)}>Delete</button>


                            </div>
                        ) : (
                            <p className="booking-closed">BOOKING CLOSED</p>)}

                    </div>
                ))}


            </div>
        </div>

    )

}

export default Bookings;
