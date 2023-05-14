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

    //add alert message the the reserve feature is coming soon
    const handleClick = () => {
        window.alert('Feature coming soon');
    };


    return (
        <div className='detailscontainer'>
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

            <div className='infocontainer'>
                <div>
                    <h3>{`Hosted by ${spotData.Owner?.firstName} ${spotData.Owner?.lastName}`}</h3>
                    <p>{spotData.description}</p>
                </div>
                <div className='rightcontainer'>
                    <div className='informationBox'>
                        <div className='topbox'>
                            <p className='pricedetails'>{`$${spotData.price.toFixed(2)} night`}</p>
                            <p><i className="fa-solid fa-star"></i> {spotData.avgStarRating ? spotData.avgStarRating.toFixed(2) : "New"}{spotData.numReviews ? spotData.numReviews === 1 ? ` · ${spotData.numReviews} Review` : ` · ${spotData.numReviews} Reviews` : ''}</p>
                        </div>
                        <button
                            onClick={handleClick}
                            className='reservebutton'
                        >Reserve</button>
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
                        {user && user?.id === review.User?.id ? <button><OpenModalMenuItem
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
