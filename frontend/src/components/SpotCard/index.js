import './SpotCard.css'

const SpotCard = ({ spot }) => {


    return (
        <li className="spotcard">
            <div title={spot.name}>
                <div className='picturediv'>
                <img className='image' src={spot.previewImage} alt='' />
                </div>
                <div className='textcontainer'>
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p><i className="fa-solid fa-star"></i> {spot.avgRating ? spot.avgRating.toFixed(2) : "New"}</p>
                </div>
                <p className='textcontainer price'>{`$${spot.price} night`}</p>

            </div>

        </li>



    )



}

export default SpotCard;
