import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * CustomCalendar component that allows users to select a date range.
 * It uses a date picker to select a start and end date while excluding unavailable date ranges.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {Function} props.onDateRangeSelected - Callback function to be called when a date range is selected.
 * @param {Array} props.unavailableDates - Array of objects representing unavailable date ranges, where each object contains a `start` and `end` date.
 *
 * @returns {JSX.Element} The rendered CustomCalendar component.
 */
const CustomCalendar = ({ onDateRangeSelected, unavailableDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  /**
   * Handles changes in the selected date range.
   * Sets the start and end dates, and triggers the callback function with the selected range.
   *
   * @param {Array} dates - The selected dates [start, end].
   */
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateRangeSelected({ start, end });
    }
  };

  // Convert unavailableDates to an array of Date objects
  const unavailableDateRanges = unavailableDates.map((range) => ({
    start: new Date(range.start),
    end: new Date(range.end),
  }));

  return (
    <div className="custom-calendar-container">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        minDate={today}
        excludeDateIntervals={unavailableDateRanges}
        inline
      />
    </div>
  );
};

CustomCalendar.propTypes = {
  onDateRangeSelected: PropTypes.func.isRequired,
  unavailableDates: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    })
  ).isRequired,
};

export default CustomCalendar;
