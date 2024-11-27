import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // If you're using the react-calendar package

const CustomCalendar = ({ unavailableDates, onDateRangeSelected }) => {
  // Function to disable dates
  const tileDisabled = ({ date }) => {
    const dateString = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    return unavailableDates.includes(dateString); // Disable if the date is unavailable
  };

  return (
    <div>
      <Calendar
        onChange={onDateRangeSelected}
        tileDisabled={tileDisabled} // Pass the tileDisabled function to disable dates
        selectRange={true} // Enable range selection if you want to select a start and end date
      />
    </div>
  );
};

export default CustomCalendar;
