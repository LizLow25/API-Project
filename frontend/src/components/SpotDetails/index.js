import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotDetailsAction } from '../../store/spots';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spotData = useSelector(state => state.spots.singleSpot)
    console.log(spotData)

    useEffect(() => {
        dispatch(loadSpotDetailsAction(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            <h2>{spotData.name}</h2>
            <h3>{`${spotData.city}, ${spotData.state}, ${spotData.country}`}</h3>
            <p>{`Hosted by ${spotData.Owner?.firstName} ${spotData.Owner?.lastName}`}</p>
            <div>
            <p>{spotData.description}</p>
            <div>

            </div>

            </div>




        </div>
    )





}


export default SpotDetails;
