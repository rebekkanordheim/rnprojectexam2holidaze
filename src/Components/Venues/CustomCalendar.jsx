/* import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import PropTypes from "prop-types";

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
        <button onClick={handleBookingSubmit}>Book Now</button>
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

export default CustomCalendar;
 */

import React, { useState } from "react";
import Calendar from "react-calendar";
import PropTypes from "prop-types";


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

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "current-day";
      }
    }
    return null;
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

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={true}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName} // Highlight current day
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
        <button onClick={handleBookingSubmit}>Book Now</button>
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

export default CustomCalendar;