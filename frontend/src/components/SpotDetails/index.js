import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotDetailsAction } from '../../store/spots';
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotData = useSelector(state => state.spots.singleSpot)
    console.log(spotData)

    useEffect(() => {
        dispatch(loadSpotDetailsAction(spotId))
    }, [dispatch, spotId])

    if (!spotData.SpotImages) return null

    return (
        <div>
            <h2>{spotData.name}</h2>
            <h3>{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
            <div className='imagecontainer'>

                <img className='leadpicture' src={spotData.SpotImages[0]?.url} />

                <div className='picturegrid'>
                    <img className='innerpicture' src={spotData.SpotImages[1]?.url} />
                    <img className='innerpicture' src={spotData.SpotImages[2]?.url} />
                    <img className='innerpicture' src={spotData.SpotImages[3]?.url} />
                    <img className='innerpicture' src={spotData.SpotImages[4]?.url} />

                </div>
            </div>
            <p>{`Hosted by ${spotData.Owner?.firstName} ${spotData.Owner?.lastName}`}</p>
            <div>
                <p>{spotData.description}</p>
                <div className='informationBox'>
                    <div>
                        <p>{`$${spotData.price} night`}</p>
                        <p><i className="fa-solid fa-star"></i> {spotData.avgRating ? spotData.avgRating : "New"}{` - ${spotData.reviews}`}</p>
                        <button>Reserve</button>
                    </div>
                </div>

            </div>




        </div>
    )





}


export default SpotDetails;
