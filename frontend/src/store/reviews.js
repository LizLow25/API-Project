import { csrfFetch } from "./csrf";

export const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS'

export const loadSpotReviews = (reviews) =>({
    type: LOAD_SPOT_REVIEWS,
    reviews

})



export const loadSpotReviewsAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        console.log('reviews', reviews)
        dispatch(loadSpotReviews(reviews))

        return reviews
    }




}





const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
    let reviewState = {...state, spot: {...state.spot}, user: {...state.user}}
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            reviewState.spot = {}
            action.reviews.Reviews.forEach(review => {
                reviewState.spot[review.id] = review

            });
            return reviewState;
        default:
            return state;
    }
};

export default reviewsReducer;
