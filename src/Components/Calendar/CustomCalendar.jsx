import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomCalendar = ({ onDateRangeSelected, unavailableDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

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
