import './SpotCard.css'

const SpotCard = ({ spot }) => {
    return (
        <li className="spotcard">
            <div>
                <img className='image' src={spot.previewImage} alt='' />
                <div className='textcontainer'>
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p><i class="fa-solid fa-star"></i>{spot.avgRating}</p>
                </div>
                <p className='textcontainer'>{`$${spot.price} night`}</p>

            </div>

        </li>



    )



}

export default SpotCard;
