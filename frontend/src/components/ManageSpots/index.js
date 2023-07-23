import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getSpotsByOwner } from "../../store/spots";
import SpotCard from '../SpotCard'
import './ManageSpots.css'


import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal';
import { getSpotBookingsThunk } from '../../store/bookings';

const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [number , setNumber] = useState(15)



    const spotsData = useSelector(state => state.spots.allSpots);

    const user = useSelector(state => state.session.user)

    const spots = Object.values(spotsData);
    const price = number * 181

    useEffect(() => {
        dispatch(getSpotsByOwner())

    }, [dispatch])

    if (user && !spots?.length) {
        return (
            <div className='nospotsyet'>
                <div className='airRvtitle'>AirRV it.</div>
                <div className='earndiv'>You could earn</div>
                <div className='earndiv'>$ {price.toLocaleString("en-US")} </div>
                <div className='earnbynights'>{number} nights at at estimated $181 night</div>
                <div class="slidecontainer">
                    <input type="range" min="1" max="30" value={number} className="slider" onChange={(e) => setNumber(e.target.value)}/>
                </div>

                <button className='managebutton' onClick={() => history.push('/spots/new')}>Get started</button>

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
