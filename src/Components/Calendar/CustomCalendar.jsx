import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * CustomCalendar component that allows users to select a date range.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onDateRangeSelected - Function to handle the selected date range.
 * @returns {JSX.Element} JSX element representing the CustomCalendar component.
 */
const CustomCalendar = ({ onDateRangeSelected }) => {
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

  return (
    <div>
      <label htmlFor="calendar">Select a date range:</label>
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
    </div>
  );
};

// PropTypes validation
CustomCalendar.propTypes = {
  onDateRangeSelected: PropTypes.func.isRequired,
};

export default CustomCalendar;
