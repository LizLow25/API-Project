import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS'
export const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS'
export const ADD_SPOT = 'spots/ADD_SPOT';
export const ADD_IMAGE = 'spots/ADD_IMAGE';
export const MANAGE_SPOTS = 'spots/MANAGE_SPOTS'
export const DELETE_SPOT = 'spots/DELETE_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
});

export const loadSpotDetails = (spot) => ({
    type: LOAD_SPOT_DETAILS,
    spot
})

export const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

export const addImage = (image) => ({
    type: ADD_IMAGE,
    image
})

export const manageSpots = (spots) => ({
    type: MANAGE_SPOTS,
    spots
})

export const deleteSpot = (id) => ({
    type: DELETE_SPOT,
    id

})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})


export const fetchSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    dispatch(loadSpots(spots))
}

export const loadSpotDetailsAction = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSpotDetails(spot))

        return spot
    }

}

export const addSpotAction = (spot) => async dispatch => {
    try {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            body: JSON.stringify(spot)

        });
        if (response.ok) {
            //route works
            const spot = await response.json();
            dispatch(addSpot(spot))
            return spot
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


export const addSpotImageAction = (image, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    });
    if (response.ok) {
        const newImage = await response.json();
        dispatch(addImage(newImage))
    }

}

export const getSpotsByOwner = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const spots = await response.json();
        dispatch(manageSpots(spots))
        return spots
    } else {
        return false
    }
}

export const deleteSpotAction = (id) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteSpot(id))
    }



}

export const updateSpotAction = (spot, id) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot))
    }

}






const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {
    const spotsState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
    switch (action.type) {
        case LOAD_SPOTS:
            spotsState.allSpots = {}
            action.spots.Spots.forEach((spot) => {
                spotsState.allSpots[spot.id] = spot;
            });
            return spotsState;
        case LOAD_SPOT_DETAILS:
            spotsState.singleSpot = action.spot
            return spotsState
        case ADD_SPOT:
            spotsState.allSpots[action.spot.id] = action.spot
            return spotsState
        case ADD_IMAGE:
            spotsState.singleSpot.SpotImages = [];
            spotsState.singleSpot.SpotImages.push(action.image);
            return spotsState;
        case MANAGE_SPOTS:
            spotsState.allSpots = {}
            console.log("spots", action.spots)
            action.spots.forEach((spot) => {
                spotsState.allSpots[spot.id] = spot;
            });
            return spotsState;
        case DELETE_SPOT:
            delete spotsState.allSpots[action.id]
            return spotsState;
        case UPDATE_SPOT:
            spotsState.allSpots = {}
            spotsState.singleSpot = {}
            spotsState.allSpots[action.spot.id] = action.spot;
            spotsState.singleSpot = action.spot;
            return spotsState
        default:
            return state;
    }
};

export default spotsReducer;
