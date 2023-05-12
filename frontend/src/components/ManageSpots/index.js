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
    const user = useSelector(state => state.session.user)

    const spots = Object.values(spotsData);

    useEffect(() => {
        dispatch(getSpotsByOwner())
    }, [dispatch])

    console.log(spots.length)


    return (
        <>
            <h2>Manage Spots</h2>
            <div>
                {user && !spots.length ? <Link to='/spots/new'><button>Create New Spot</button></Link> : ''}
                <ul className='spotcards'>
                    {spots?.map((spot) => (
                        <div key={spot.id}>
                            <Link to={`/spots/${spot.id}`} className='spotlink' >
                                <ManageSpotCard
                                    spot={spot}
                                />
                            </Link>

                            <Link exact to={`/spots/${spot.id}/edit`}><button>Update</button></Link>
                            <button><OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteSpotModal spot={spot} />}
                            /></button>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )


}


export default ManageSpots;
