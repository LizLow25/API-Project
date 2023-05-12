import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import './DeleteReview.css'
import { deleteReviewAction } from '../../store/reviews';
import { loadSpotDetailsAction } from '../../store/spots';



function DeleteReviewModal({ id, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeDelete = () => {
        return closeModal()
    }

    const deleteReviewClick = async() => {
        await dispatch(deleteReviewAction(id))
        await dispatch(loadSpotDetailsAction(spotId))
        return closeModal()

    }


    return (
        <div className="deletemodal">
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to delete this review?</h2>
            <button onClick={deleteReviewClick}>Yes (Delete Review)</button>
            <button
                onClick={closeDelete}>No (Keep Review)</button>

        </div>
    )

}

export default DeleteReviewModal
