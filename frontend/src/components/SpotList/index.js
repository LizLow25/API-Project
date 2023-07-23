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
        <>
        <div className='landingpage'>


            {spots.map((spot) => (
                <div key={spot.id}>
                    <Link to={`/spots/${spot.id}`} className='spotlink'
                    >
                        {console.log('spot.price', spot.price)}
                        <SpotCard
                            spot={spot}
                            spotPrice={spot.price}
                        />
                    </Link>
                </div>
            ))}


        </div>
        <div className='person-container'>
                <p>Created by Liz Lowry</p>
                <div className='link-container'>
                    <a target='_blank' href='https://www.linkedin.com/in/elizabeth-lowry-33201a14'><i class="fa-brands fa-linkedin fa-2xl"></i></a>
                    <a target='_blank' href='https://github.com/LizLow25'><i class="fa-brands fa-square-github fa-2xl"></i></a>
                </div>
            </div>
</>
    )




}


export default SpotList;
