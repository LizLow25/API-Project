import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from '../../store/bookings';
import SpotCard from "../SpotCard";
import { Link } from 'react-router-dom'

function Bookings() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.user.Bookings);

    console.log('bookings', bookings)



    useEffect(() => {
        dispatch(getUserBookingsThunk());

    }, [dispatch]);

    return (
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
                    </div>
                ))}


        </div>
    )

}

export default Bookings;
