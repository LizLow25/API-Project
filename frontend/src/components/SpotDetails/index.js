import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotDetailsAction } from '../../store/spots';
import './SpotDetails.css'
import { loadSpotReviewsAction } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteReviewModal';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotData = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const user = useSelector(state => state.session.user)
    const reviewData = Object.values(reviews)
    console.log("reviewData", reviewData)


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
                        <p><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating : "New"}{spotData.numReviews ? spotData.numReviews === 1 ? ` - ${spotData.numReviews} Review` : ` - ${spotData.numReviews} Reviews` : ''}</p>
                        <button>Reserve</button>
                    </div>
                </div>

            </div>

            <div>
                <p><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating : "New"}{spotData.numReviews ? spotData.numReviews === 1 ? ` - ${spotData.numReviews} Review` : ` - ${spotData.numReviews} Reviews` : ''}</p>
            </div>
            {user && spotData.numReviews === 0 && user?.id != spotData.ownerId ? <button><OpenModalMenuItem
                itemText="Be the First to Post a Review!"
                modalComponent={<CreateReviewModal spotId={spotId} />}
            /></button> : ''}
            {user && user?.id != spotData.ownerId && !priorReviewUsers.includes(user?.id) && spotData.numReviews !== 0 ? <button><OpenModalMenuItem
                itemText="Post Your Review!"
                modalComponent={<CreateReviewModal spotId={spotId} />}
            /></button> : ''}
            <ul>
                {reviewData.length ? reviewData.map((review) => (
                    <li key={review.id}>
                        <h3>{review.User?.firstName}</h3>
                        <p>{review.createdAt}</p>
                        <p>{review.review}</p>
                        {user && user?.id === review.User?.id ? <button><OpenModalMenuItem
                            itemText="Delete"
                            modalComponent={<DeleteReviewModal id={review.id} spotId={spotId}/>}
                        /></button> : ''}

                    </li>
                )) : ''}

            </ul>


        </div>
    )





}


export default SpotDetails;
