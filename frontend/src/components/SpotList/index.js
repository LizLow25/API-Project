import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSpots } from '../../store/spots';
import SpotCard from '../SpotCard';
import "./SpotList.css"

const SpotList = () => {
    const dispatch = useDispatch();
    const spotsData = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsData);


    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch], spotsData)

    return (
        <div className='landingpage'>
            <ul className='spotcards'>
                {spots.map((spot) => (
                    <Link to={`/spots/${spot.id}`} className='spotlink' key={spot.id}
                    >
                        <SpotCard
                            spot={spot}
                        />
                    </Link>
                ))}
            </ul>
        </div>

    )




}


export default SpotList;
