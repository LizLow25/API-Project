import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import './CreateReview.css'
import { loadSpotReviewsAction, submitReviewAction } from '../../store/reviews';
import { loadSpotDetailsAction } from '../../store/spots';
import { useModal } from '../../context/Modal';

function CreateReviewModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true)
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0)
    const [stars, setStars] = useState(['empty', 'empty', 'empty', 'empty', 'empty']);

    useEffect(() => {
        if(review.length > 10 && rating) setDisabled(false)

    }, [review, rating])




    const mouse = (num) => {
        let starSettings = ['empty', 'empty', 'empty', 'empty', 'empty']
        for (let i = 0; i < num; i++) {
            starSettings[i] = 'filled'
            setStars(starSettings)
        }
    }

    const onChange = (number) => {
        setRating(parseInt(number));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars: rating

        }

        await dispatch(submitReviewAction(newReview, spotId))
        await dispatch(loadSpotReviewsAction(spotId))
        await dispatch(loadSpotDetailsAction(spotId))

        closeModal()



    };




    return (
        <div className="reviewmodal">
            <h1>How was your stay?</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name="body"
                    placeholder="Leave your review here..."
                    rows="8"
                ></textarea>
                <div className="rating-input">
                    <div className={stars[0]} >
                        <i
                            className="fa-solid fa-star"
                            onMouseEnter={() => mouse(1)}
                            onClick={() => onChange(1)}
                        ></i>
                    </div>
                    <div className={stars[1]} >
                        <i
                            className="fa-solid fa-star"
                            onMouseEnter={() => mouse(2)}
                            onClick={() => onChange(2)}
                        ></i>
                    </div>
                    <div className={stars[2]} >
                        <i
                            className="fa-solid fa-star"
                            onMouseEnter={() => mouse(3)}
                            onClick={() => onChange(3)}
                        ></i>
                    </div>
                    <div className={stars[3]} >
                        <i
                            className="fa-solid fa-star"
                            onMouseEnter={() => mouse(4)}
                            onClick={() => onChange(4)}
                        ></i>
                    </div>
                    <div className={stars[4]} >
                        <i
                            className="fa-solid fa-star"
                            onMouseEnter={() => mouse(5)}
                            onClick={() => onChange(5)}
                        ></i>
                    </div>
                    <p> Stars</p>
                </div>
                <button
                type="submit"
                disabled={disabled}
                >Submit Your Review</button>
            </form>


        </div>
    )

}

export default CreateReviewModal;
