import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpotsByOwner } from "../../store/spots";
import SpotCard from '../SpotCard'
import './ManageSpots.css'


import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal';
import { getSpotBookingsThunk } from '../../store/bookings';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spotsData = useSelector(state => state.spots.allSpots);

    const user = useSelector(state => state.session.user)

    const spots = Object.values(spotsData);

    useEffect(() => {
        dispatch(getSpotsByOwner())

    }, [dispatch])

    if (user && !spots?.length) {
        return (
            <div>
                <h2>AirRV it.</h2>
                <h3>You could earn</h3>
                <div class="slidecontainer">
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                </div>

            </div>
        )
    }




    return (
        <>
            <h2>Manage Spots</h2>
            <div className='managepage'>
                {user && !spots.length ? <Link to='/spots/new'><button>Create New Spot</button></Link> : ''}

                <div className='spotcards'>
                    {spots?.map((spot) => (
                        <div key={spot.id} className='managespotcard'>
                            <Link to={`/spots/${spot.id}`} className='spotlink' >
                                <SpotCard
                                    spot={spot}
                                />
                            </Link>

                            <div className='buttoncontainer'>

                                <Link exact to={`/spots/${spot.id}/edit`}><button className='modalbutton'>Update</button></Link>
                                <button className='modalbutton'><OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={<DeleteSpotModal spot={spot} />}
                                /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}


export default ManageSpots;
