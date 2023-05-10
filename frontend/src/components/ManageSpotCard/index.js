const ManageSpotCard = ({ spot }) => {

    return (


        <li className="spotcard">
            <div>
                <img className='image' src={spot.previewImage} alt='' />
                <div className='textcontainer'>
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p><i className="fa-solid fa-star"></i>{spot.avgRating}</p>
                </div>
                <p className='textcontainer'>{`$${spot.price} night`}</p>
                <div>
                    <button>Update</button>
                    <button>Delete</button>
                </div>

            </div>

        </li>
    )
}

export default ManageSpotCard
