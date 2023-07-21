import { csrfFetch } from "./csrf";

// ---------- THUNKS ----------
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

  // ---------- INITIAL STATE -------------
const initialState = { user: {}, spot: {} };

// ---------- REDUCER ----------
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOAD_USER_BOOKINGS:
    //   let userBookingsState = { ...state, user: { ...action.bookings } };
    //   return userBookingsState;
    // case LOAD_SPOT_BOOKINGS:
    //   let spotBookingsState = { ...state, spot: { ...action.bookings } };
    //   return spotBookingsState;
    default:
      return state;
  }
};

export default bookingsReducer;
