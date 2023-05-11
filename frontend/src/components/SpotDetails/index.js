import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotDetailsAction } from '../../store/spots';
import './SpotDetails.css'
import { loadSpotReviewsAction } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotData = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user.id)
    const reviewData = Object.values(reviews)
    console.log('spotData', spotData)
    console.log('userid', user)

    useEffect(() => {
        dispatch(loadSpotDetailsAction(spotId))
        dispatch(loadSpotReviewsAction(spotId))
    }, [dispatch, spotId])

    if (!spotData.SpotImages) return null

    return (
        <div>
            <h2>{spotData.name}</h2>
            <h3>{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
            <div className='imagecontainer'>

                <img className='leadpicture' src={spotData.SpotImages[0]?.url} alt='' />

                <div className='picturegrid'>
                    <img className='innerpicture' src={spotData.SpotImages[1]?.url} alt='' />
                    <img className='innerpicture' src={spotData.SpotImages[2]?.url} alt='' />
                    <img className='innerpicture' src={spotData.SpotImages[3]?.url} alt='' />
                    <img className='innerpicture' src={spotData.SpotImages[4]?.url} alt='' />

                </div>
            </div>
            <p>{`Hosted by ${spotData.Owner?.firstName} ${spotData.Owner?.lastName}`}</p>
            <div>
                <p>{spotData.description}</p>
                <div className='informationBox'>
                    <div>
                        <p>{`$${spotData.price} night`}</p>
                        <p><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating : "New"}{` - ${spotData.numReviews} reviews`}</p>
                        <button>Reserve</button>
                    </div>
                </div>

            </div>

            <div>
                <p><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating : "New"}{` - ${spotData.numReviews} reviews`}</p>
            </div>
            {spotData.numReviews === 0 && user != spotData.ownerId ? <button><OpenModalMenuItem
                                itemText="Be the First to Post a Review!"
                                modalComponent={<CreateReviewModal spot={spotData} />}
                            /></button>: ''}
            <ul>
            {reviewData.map((review) => (
                    <li key={review.id}>
                        <h3>{review.User.firstName}</h3>
                        <p>{review.createdAt}</p>
                        <p>{review.review}</p>


                    </li>
                ))}

            </ul>


        </div>
    )





}


export default SpotDetails;
