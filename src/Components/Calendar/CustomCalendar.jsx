import React, { useState } from "react";
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

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateRangeSelected({ start, end });
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default CustomCalendar;
