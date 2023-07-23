import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import './DeleteReview.css'
import { deleteReviewAction } from '../../store/reviews';
import { loadSpotDetailsAction } from '../../store/spots';
import { loadSpotReviewsAction } from '../../store/reviews';



function DeleteReviewModal({ id, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeDelete = () => {
        return closeModal()
    }

    const deleteReviewClick = async () => {
        await dispatch(deleteReviewAction(id))
        // await dispatch(loadSpotDetailsAction(spotId))
        await dispatch(loadSpotReviewsAction(spotId))
        return closeModal()

    }


    return (
        <div className="deletemodal">
            <div className='deletereviewcontainer'>
                <h2>Confirm Delete</h2>
                <h3>Are you sure you want to delete this review?</h3>
                <button
                    className='deletereviewbutton'
                    onClick={deleteReviewClick}>Yes (Delete Review)</button>
                <button
                    className='dontdeletereviewbutton'
                    onClick={closeDelete}>No (Keep Review)</button>
            </div>
        </div>
    )

}

export default DeleteReviewModal
