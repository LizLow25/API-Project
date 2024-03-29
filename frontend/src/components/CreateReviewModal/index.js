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
    const [errors, setErrors] = useState({})
    const [stars, setStars] = useState(['empty', 'empty', 'empty', 'empty', 'empty']);

    useEffect(() => {
        if (review.length > 10 && rating) setDisabled(false)

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

        let newErrors = {}


        if (review.length < 10) newErrors['review'] = "Review must be over 10 characters"
        if (!rating) newErrors['stars'] = "Please select a star rating"

        setErrors(newErrors)

        if (Object.values(newErrors).length) return

        const newReview = {
            review,
            stars: rating

        }

        await dispatch(submitReviewAction(newReview, spotId))
        await dispatch(loadSpotReviewsAction(spotId))
        await dispatch(loadSpotDetailsAction(spotId))

        return closeModal()



    };




    return (
        <div className="reviewmodal">
            <h3>How was your stay?</h3>
            <form className='reviewformmodal' onSubmit={handleSubmit}>
                <span className='errors'>{errors.review}</span>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name="body"
                    placeholder="Leave your review here..."
                    rows="8"
                ></textarea>
                <span className='errors'>{errors.stars}</span>
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
                    <p className='starstext'>Stars</p>
                </div>
                <button
                    className='loginbutton'
                    type="submit"

                >Submit Your Review</button>
            </form>


        </div>
    )

}

export default CreateReviewModal;
