import { csrfFetch } from "./csrf";

export const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS'
export const SUBMIT_REVIEW = 'reviews/SUBMIT_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews

})

export const submitReview = (review) => ({
    type: SUBMIT_REVIEW,
    review
})

export const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})



export const loadSpotReviewsAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadSpotReviews(reviews))

        return reviews
    }

}

export const submitReviewAction = (review, id) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review)

        });
        if (response.ok) {
            //route works
            const review = await response.json();
            dispatch(submitReview(review))
            return review
        } else {
            //route error
            return response.json()
        }
    } catch (e) {
        //validation errors
        let response = await e.json()
        return response
    }


}

export const deleteReviewAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteReview(id))
    }

}





const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
    let reviewState = { ...state, spot: { ...state.spot, User: { ...state.spot.User } }, user: { ...state.user, User: { ...state.spot.User } } }
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            reviewState.spot = {}
            action.reviews.Reviews.forEach(review => {
                reviewState.spot[review.id] = review

            });
            return reviewState;
        case SUBMIT_REVIEW:
            reviewState.spot[action.review.id] = action.review
            return reviewState;
        case DELETE_REVIEW:
            delete reviewState.spot[action.id];
            return reviewState;
        default:
            return state;
    }
};

export default reviewsReducer;
