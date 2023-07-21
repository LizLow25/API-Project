import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotDetailsAction } from '../../store/spots';
import './SpotDetails.css'
import { loadSpotReviewsAction } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal';
import { createBookingThunk, getUserBookingsThunk } from '../../store/bookings';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spotData = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user)
    const reviewData = Object.values(reviews)
    console.log("reviewData", reviewData)

    //state for create booking
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});


    //make a shallow copy of the review data and then call array.reverse() to switch the order of the reviews
    let shallowReview = [...reviewData]

    shallowReview.reverse();



    let priorReviewUsers = [];
    reviewData.forEach(review => {
        priorReviewUsers.push(review.userId)

    })
    console.log('spotData', spotData)
    console.log('reviewspeope', priorReviewUsers)

    useEffect(() => {
        dispatch(loadSpotDetailsAction(spotId))
        dispatch(loadSpotReviewsAction(spotId))
    }, [dispatch, spotId])

    if (!spotData.SpotImages) return null

    // Building form object for booking thunk submission
    const form = {};
    form.startDate = startDate;
    form.endDate = endDate;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (new Date() > new Date(startDate).getTime())
            newErrors["startDate"] = "Start date must be in the future!";
        if (!startDate) newErrors["startDate"] = "Please select a start date!";
        if (new Date(endDate) < new Date(startDate).getTime())
            newErrors["endDate"] = "End date must be after the start date!";
        if (!endDate) newErrors["endDate"] = "Please select an end date!";

        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        dispatch(createBookingThunk(form, spotId));
        dispatch(getUserBookingsThunk())
        history.push('/bookings')

    };


    return (
        <div className='detailscontainer'>
            <h2>{spotData.name}</h2>
            <h3>{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
            <div className='imagecontainer'>

                <img className='leadpicture' src={spotData.SpotImages[0]?.url} alt='' />

                <div className='picturegrid'>
                    <img className='innerpicture one' src={spotData.SpotImages[1]?.url} alt='' />
                    <img className='innerpicture two' src={spotData.SpotImages[2]?.url} alt='' />
                    <img className='innerpicture three' src={spotData.SpotImages[3]?.url} alt='' />
                    <img className='innerpicture four' src={spotData.SpotImages[4]?.url} alt='' />

                </div>
            </div>

            <div className='infocontainer'>
                <div>
                    <h3>{`Hosted by ${spotData.Owner?.firstName} ${spotData.Owner?.lastName}`}</h3>
                    <p>{spotData.description}</p>
                </div>
                <div className='rightcontainer'>
                    <div className='informationBox'>
                        <div className='topbox'>
                            <p className='pricedetails'>{`$${spotData.price} night`}</p>
                            <p><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating.toFixed(2) : "New"}{spotData.numReviews ? spotData.numReviews === 1 ? ` · ${spotData.numReviews} Review` : ` · ${spotData.numReviews} Reviews` : ''}</p>
                        </div>
                        <h1>Book your stay!</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                CHECK-IN <span className="errors">{errors.startDate}</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    placeholder="Start Date"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="start-date"
                                />
                            </label>
                            <label>
                                CHECKOUT <span className="errors">{errors.endDate}</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    placeholder="End Date"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="end-date"
                                />
                            </label>
                            <div className="post-booking-button-container">
                                <button
                                    type="submit"
                                    className="post-booking-button"
                                //   disabled={disabled}
                                >
                                    Reserve
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <div>
                <h3><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating.toFixed(2) : "New"}{spotData.numReviews ? spotData.numReviews === 1 ? ` · ${spotData.numReviews} Review` : ` · ${spotData.numReviews} Reviews` : ''}</h3>
            </div>
            {user && spotData.numReviews === 0 && user?.id != spotData.ownerId ? <button
                className='spotdetailsfirstreviewbutton'

            ><OpenModalMenuItem
                    itemText="Be the First to Post a Review!"
                    modalComponent={<CreateReviewModal spotId={spotId} />}
                /></button> : ''}
            {user && user?.id != spotData.ownerId && !priorReviewUsers.includes(user?.id) && spotData.numReviews !== 0 ? <button className='spotdetailsfirstreviewbutton'><OpenModalMenuItem
                itemText="Post Your Review!"
                modalComponent={<CreateReviewModal spotId={spotId} />}
            /></button> : ''}
            <ul className='reviewlist'>
                {shallowReview.length ? shallowReview.map((review) => (
                    <li key={review.id} className='reviewlistinner'>
                        <h3 className='reviewdat'>{review.User?.firstName}</h3>
                        <p className='reviewdate'>{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: "numeric",
                            month: "long"
                        }) : ''}</p>
                        <p className='reviewdat'>{review.review}</p>
                        {user && user?.id === review.User?.id ? <button className='spotdetailsfirstreviewbutton'><OpenModalMenuItem
                            itemText="Delete"
                            modalComponent={<DeleteReviewModal id={review.id} spotId={spotId} />}
                        /></button> : ''}

                    </li>
                )) : ''}

            </ul>


        </div>
    )





}


export default SpotDetails;
