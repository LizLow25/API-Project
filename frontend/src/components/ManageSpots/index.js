import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotsByOwner } from "../../store/spots";
import ManageSpotCard from '../ManageSpotCard';


import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spotsData = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsData);

    useEffect(() => {
        dispatch(getSpotsByOwner())
    }, [dispatch, spotsData])



    return (
        <>
            <h2>Manage Spots</h2>
            <div>
                <ul className='spotcards'>
                    {spots?.map((spot) => (
                        <div key={spot.id}>
                            <Link to={`/spots/${spot.id}`} className='spotlink' >
                                <ManageSpotCard
                                    spot={spot}
                                />
                            </Link>

                            <button>Update</button>
                            <button><OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteSpotModal  spot={spot}/>}
                            /></button>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )


}


export default ManageSpots;
