export const LOAD_SPOTS = 'spots/LOAD_SPOTS'
export const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS'


export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
});

export const loadSpotDetails = (spot) => ({
    type: LOAD_SPOT_DETAILS,
    spot
})


export const fetchSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    dispatch(loadSpots(spots))
}

export const loadSpotDetailsAction = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    const spot = await response.json();
    dispatch(loadSpotDetails(spot))

}


const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {
    const spotsState = { ...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot} };
    switch (action.type) {
        case LOAD_SPOTS:
            action.spots.Spots.forEach((spot) => {
                spotsState.allSpots[spot.id] = spot;
            });
            return spotsState;
        case LOAD_SPOT_DETAILS:
            spotsState.singleSpot = action.spot
            console.log(spotsState.singleSpot)
            return spotsState
        default:
            return state;
    }
};

export default spotsReducer;
