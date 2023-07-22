import { csrfFetch } from "./csrf";

export const LOAD_USER_BOOKINGS = "bookings/LOAD_USER_BOOKINGS";


// ---------- ACTION CREATORS ----------
export const loadUserBookings = (bookings) => ({
    type: LOAD_USER_BOOKINGS,
    bookings,
});

// ---------- THUNKS ----------
//Get all of the Current User's Bookings
export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await fetch("/api/bookings/current");
    const bookings = await response.json();
    dispatch(loadUserBookings(bookings));
};


//Create a new booking
export const createBookingThunk = (form, spotId) => async (dispatch) => {
    let response;
    try {
        response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const newBooking = await response.json();

        return newBooking;
    } catch (e) {
        const errors = await e.json();
        console.log(errors)
        return errors;
    }
};

//Delete a booking
export const deleteBookingThunk = (bookingId) => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errors = await response.json();

        return errors;
    } else {

        const data = await response.json();
        return data;
    }
};

//Update a booking
export const updateBookingThunk = (form, bookingId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            const errors = await response.json();
            console.log("update errors", errors)
            return errors;
        } else {
            const data = await response.json();
            console.log("newly updated booking", data);
            return data;
        }
    } catch (e) {
        const errors = await e.json();
        console.log("updateerrors", errors)
        return errors;
    }
};


// ---------- INITIAL STATE -------------
const initialState = { user: {}, spot: {} };

// ---------- REDUCER ----------
const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_BOOKINGS:
            let userBookingsState = { ...state, user: { ...action.bookings } };
            return userBookingsState;
        // case LOAD_SPOT_BOOKINGS:
        //   let spotBookingsState = { ...state, spot: { ...action.bookings } };
        //   return spotBookingsState;
        default:
            return state;
    }
};

export default bookingsReducer;
