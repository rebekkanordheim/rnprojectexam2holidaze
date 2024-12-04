import React, { useState } from "react";
import styles from "../../Button.module.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * CustomCalendar component that allows users to select a date range and add to the booking cart.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onDateRangeSelected - Function to handle the selected date range.
 * @param {Function} props.addToBookingCart - Function to handle adding the selected date range to the booking cart.
 * @returns {JSX.Element} JSX element representing the CustomCalendar component.
 */
const CustomCalendar = ({ onDateRangeSelected, addToBookingCart }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date(); // Prevent past dates

  /**
   * Handles the date range selection and triggers the onDateRangeSelected callback
   * when both start and end dates are selected.
   *
   * @param {Array} dates - An array containing the start and end dates.
   */
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateRangeSelected({ start, end });
    }
  };

  /**
   * Handles the "Add to Booking Cart" button click.
   */
  const handleAddToCart = () => {
    if (startDate && endDate) {
      // Create a booking object with the selected dates
      const booking = { startDate, endDate };
      addToBookingCart(booking); // Add the booking to the cart
    } else {
      alert("Please select a date range.");
    }
  };

  return (
    <div className="calendar">
      <label htmlFor="calendar">Select a date range:</label>
      <br />
      <DatePicker
        id="calendar"
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        minDate={today} // Disable past dates
        inline
        aria-label="Date range picker"
      />
      <button onClick={handleAddToCart} className={styles.button}>
        Add to Booking Cart
      </button>
    </div>
  );
};

// PropTypes validation
CustomCalendar.propTypes = {
  onDateRangeSelected: PropTypes.func.isRequired,
  addToBookingCart: PropTypes.func.isRequired,
};

export default CustomCalendar;
