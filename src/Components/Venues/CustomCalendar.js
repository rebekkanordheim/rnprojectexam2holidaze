/* 
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import PropTypes from "prop-types";
import styles from "../../Button.module.css";

const CustomCalendar = ({ bookings, pricePerNight, maxGuests, onBookingSubmit }) => {
  const [value, setValue] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const tileDisabled = ({ date, view }) => {
    return (
      view === "month" &&
      bookings.some(
        (booking) =>
          date >= new Date(booking.dateFrom) && date <= new Date(booking.dateTo)
      )
    );
  };

  const calculateTotalCost = (startDate, endDate, guests) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
    return days * pricePerNight * guests;
  };

  const handleDateChange = (newRange) => {
    if (Array.isArray(newRange) && newRange.length === 2) {
      const [startDate, endDate] = newRange;
      const cost = calculateTotalCost(startDate, endDate, guests);
      setTotalCost(cost);
      setValue(newRange);
    }
  };

  const handleBookingSubmit = () => {
    const [startDate, endDate] = value;
    onBookingSubmit({ startDate, endDate, guests, totalCost });
  };

  // Go to today function
  const goToToday = () => {
    setValue([new Date(), new Date()]);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={true}
        tileDisabled={tileDisabled}
      />
      <div>
        <label>
          Guests:
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <p>Total Cost: ${totalCost}</p>
        <button onClick={handleBookingSubmit} className={styles.button}>
          Book Now
        </button>
        <button onClick={goToToday} className={styles.button}>
          Go to Today
        </button>
      </div>
    </div>
  );
};

CustomCalendar.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ).isRequired,
  pricePerNight: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  onBookingSubmit: PropTypes.func.isRequired,
};

export default CustomCalendar; */

/* 
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import PropTypes from "prop-types";
import styles from "../../Button.module.css";

const CustomCalendar = ({ bookings, pricePerNight, maxGuests, onBookingSubmit }) => {
  const [value, setValue] = useState([new Date(), new Date()]);
  const [guests, setGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const tileDisabled = ({ date, view }) => {
    return (
      view === "month" &&
      bookings.some(
        (booking) =>
          date >= new Date(booking.dateFrom) && date <= new Date(booking.dateTo)
      )
    );
  };

  const calculateTotalCost = (startDate, endDate, guests) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
    return days * pricePerNight * guests;
  };

  const handleDateChange = (newRange) => {
    if (Array.isArray(newRange) && newRange.length === 2) {
      const [startDate, endDate] = newRange;
      const cost = calculateTotalCost(startDate, endDate, guests);
      setTotalCost(cost);
      setValue(newRange);
    }
  };

  const handleBookingSubmit = () => {
    const [startDate, endDate] = value;
    onBookingSubmit({ startDate, endDate, guests, totalCost });
  };

  const goToToday = () => {
    setValue([new Date(), new Date()]);
  };

  // Function to check if a date is within the selected range
  const tileClassName = ({ date, view }) => {
    const [startDate, endDate] = value;
    if (view === "month") {
      if (date >= startDate && date <= endDate) {
        return "selected-date"; // Apply a custom class for selected dates
      }
      if (date.toDateString() === startDate.toDateString()) {
        return "start-date"; // Apply a class for the start date
      }
      if (date.toDateString() === endDate.toDateString()) {
        return "end-date"; // Apply a class for the end date
      }
    }
    return "";
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={true}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName} // Add the tileClassName function
      />
      <div>
        <label>
          Guests:
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <p>Total Cost: ${totalCost}</p>
        <button onClick={handleBookingSubmit} className={styles.button}>
          Book Now
        </button>
        <button onClick={goToToday} className={styles.button}>
          Go to Today
        </button>
      </div>
    </div>
  );
};

CustomCalendar.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ).isRequired,
  pricePerNight: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  onBookingSubmit: PropTypes.func.isRequired,
};

export default CustomCalendar; */

// src/Components/Calendar/CustomCalendar.jsx
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