import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotsByOwner } from "../../store/spots";
import ManageSpotCard from '../ManageSpotCard';


const ManageSpots = () => {
    const dispatch = useDispatch();
    const spotsData = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsData);

    useEffect( () => {
        dispatch(getSpotsByOwner())
    }, [dispatch, ])



    return (
        <>
            <h2>Manage Spots</h2>
            <div>
            <ul className='spotcards'>
                {spots?.map((spot) => (
                    <Link to={`/spots/${spot.id}`} className='spotlink' key={spot.id}>
                        <ManageSpotCard
                            spot={spot}
                        />
                    </Link>
                ))}
            </ul>
        </div>
        </>
    )


}


export default ManageSpots;
