import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomCalendar = ({ onDateRangeSelected }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleAddToCart = () => {
    if (startDate && endDate) {
      onDateRangeSelected({ startDate, endDate });
    } else {
      alert("Please select a date range.");
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        minDate={today}
        inline
      />
      <button onClick={handleAddToCart}>Add to Booking Cart</button>
    </div>
  );
};

CustomCalendar.propTypes = {
  onDateRangeSelected: PropTypes.func.isRequired,
};

export default CustomCalendar;
