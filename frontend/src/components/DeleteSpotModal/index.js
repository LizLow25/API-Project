import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteSpotAction } from '../../store/spots';
import './DeleteSpot.css'

function DeleteSpotModal({ spot }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeDelete = () => {
        return closeModal()
    }

    const deleteSpotClick = async () => {
        await dispatch(deleteSpotAction(spot.id))
        return closeModal()

    }


    return (
        <div className="deletemodal">
            <div className='deletespotcontainer'>
                <h2>Confirm Delete</h2>
                <h3 className='suredeletespot'>Are you sure you want to remove this spot
                    from the listings?</h3>
                <button
                    className='deletespotbutton'
                    onClick={deleteSpotClick}>Yes (Delete Spot)</button>
                <button
                    className='dontdeletespotbutton'
                    onClick={closeDelete}>No (Keep Spot)</button>
            </div>
        </div>
    )

}

export default DeleteSpotModal
