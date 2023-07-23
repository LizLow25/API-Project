import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserBookingsThunk, updateBookingThunk } from "../../store/bookings";
import './UpdateBookingModal.css'

function UpdateBookingModal({ booking }) {
  // Initializing stuff
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // State
  const [startDate, setStartDate] = useState(
    formatDate(booking?.startDate) || ""
  );
  const [endDate, setEndDate] = useState(formatDate(booking?.endDate) || "");
  const [errors, setErrors] = useState({});

  // Building review object for thunk prop
  const form = {};
  form.startDate = startDate;
  form.endDate = endDate;

  // Dispatching thunk on button click
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (new Date() > new Date(startDate).getTime())
      newErrors["startDate"] = "Start date must be in the future!";
    if (!startDate) newErrors["startDate"] = "Please select a start date!";
    if (new Date(endDate) < new Date(startDate).getTime())
      newErrors["endDate"] = "End date must be after the start date!";
    if (!endDate) newErrors["endDate"] = "Please select an end date!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    await dispatch(updateBookingThunk(form, booking.id));
    await dispatch(getUserBookingsThunk())

    return closeModal();
  };

  return (
    <div className="booking-modal-container">
      <h2>Change in plans?</h2>
      <form className='bookingsform' onSubmit={handleSubmit}>
        <div className='checkformbox'>
          <label className='datebox'>
            CHECK-IN <span className="errors">{errors.startDate}</span>
            <input
              type="date"
              value={startDate}
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
              className="start-date"
            />
          </label>
          <label className='datebox right'>
            CHECKOUT <span className="errors">{errors.endDate}</span>
            <input
              type="date"
              value={endDate}
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
              className="end-date"
            />
          </label>
        </div>

        <div className="post-booking-button-container">
          <button
            type="submit"
            className="post-booking-button"
          //   disabled={disabled}
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBookingModal;
