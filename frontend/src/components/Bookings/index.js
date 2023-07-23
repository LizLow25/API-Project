import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import SpotCard from "../SpotCard";
import { Link, useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import UpdateBookingModal from "../UpdateBookingModal";
import './Bookings.css'


function Bookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const bookings = useSelector((state) => state.bookings.user.Bookings);

    console.log('bookings', bookings)

    const deleteBookingClick = async (id) => {
        await dispatch(deleteBookingThunk(id))
        await dispatch(getUserBookingsThunk())
    }



    useEffect(() => {
        dispatch(getUserBookingsThunk());

    }, [dispatch]);

    if (!bookings?.length) {
        return (
            <div className="bookingscontainer">
                <h2>Trips</h2>
                <div className="notripcontainer">
                    <div className="notripcontainerleft">
                        <i class="fa-regular fa-hand-peace fa-2xl"></i>
                        <h3>No trips booked...yet!</h3>
                        <div className="adventure">Time to dust off your bags and start planning your next adventure</div>
                        <button className='tripbutton' onClick={() => history.push('/')}>Start searching</button>

                    </div>
                    <img className="notripsimage" src='https://everetsybucket.s3.us-west-1.amazonaws.com/emptytrips.png' />
                </div>

            </div>
        )
    }

    return (
        <div className="bookingscontainer">
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
                        <div className="bookeddates">{new Date(booking.startDate).toUTCString().slice(4, 16)} - {new Date(booking.endDate).toUTCString().slice(4, 16)}</div>
                        {new Date() < new Date(booking.startDate).getTime() ? (
                            <div className="booking-spot-card-button-container">
                                <OpenModalButton
                                    buttonText="Update"
                                    modalComponent={
                                        <UpdateBookingModal
                                            booking={booking}
                                        />}
                                />
                                <button className='modalbutton' onClick={() => deleteBookingClick(booking.id)}>Delete</button>


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
