import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { VENUES_API_ENDPOINT } from "../../Common/constants";
import styles from "../../Button.module.css";
import { isAuthenticated } from "../User/authUtils";

/**
 * Component for displaying and booking a specific venue.
 *
 * Fetches venue details from the API, allows users to select dates and the number of guests,
 * and confirms the booking by sending a POST request to the API.
 * Displays a success message upon successful booking.
 *
 * @returns {JSX.Element} The SpecificVenue component.
 */
const SpecificVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [bookedDates, setBookedDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null); // New state for success message

  const isUserLoggedIn = isAuthenticated();
  const [startDate, endDate] = dateRange;

  /**
   * Fetches the venue data and booked dates from the API.
   * Sets the venue and booked dates in the component state.
   */
  useEffect(() => {
    const fetchVenueData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${VENUES_API_ENDPOINT}/${id}?_bookings=true`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        setVenue(data.data);

        // Extract booked dates
        const booked = data.data.bookings.map((booking) => ({
          start: new Date(booking.dateFrom),
          end: new Date(booking.dateTo),
        }));
        setBookedDates(booked);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenueData();
  }, [id]);

  /**
   * Handles the booking confirmation by sending the booking data to the API.
   * Checks if the selected dates and number of guests are valid before confirming the booking.
   * Displays an alert if the booking fails.
   */
  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select a date range before confirming.");
      return;
    }

    if (guests < 1 || guests > venue.maxGuests) {
      alert(`Please select a number of guests between 1 and ${venue.maxGuests}.`);
      return;
    }

    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests,
      venueId: venue.id,
    };

    try {
      setIsBooking(true);

      // Retrieve token and API key
      const jwtToken = localStorage.getItem("jwtToken");
      const apiKey = localStorage.getItem("apiKey");

      if (!jwtToken || !apiKey) {
        alert("You need to log in before making a booking.");
        return;
      }

      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Booking confirmed:", responseData);

        // Set the success message
        setBookingSuccess("Booking confirmed!");
        setDateRange([null, null]);
        setGuests(1);
      } else {
        const errorData = await response.json();
        console.error("Failed to confirm booking:", errorData);
        alert(
          `Error: ${
            errorData.errors?.[0]?.message || "Booking failed. Please try again."
          }`
        );
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("An error occurred while confirming your booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  /**
   * Checks if a given date is within the booked dates.
   *
   * @param {Date} date - The date to check.
   * @returns {boolean} True if the date is within a booked date range, false otherwise.
   */
  const isDateDisabled = (date) => {
    return bookedDates.some(
      (bookedDate) => date >= bookedDate.start && date <= bookedDate.end
    );
  };

  if (isLoading) return <div>Loading venue...</div>;
  if (isError) return <div>Something went wrong while fetching venue data.</div>;

  return (
    <div className="venue specific-venue-container">
      {venue && (
        <>
          {venue.media && venue.media.length > 0 && (
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || "Venue image"}
              className="specific-venue-image"
            />
          )}
          <h2 className="venue-title">{venue.name}</h2>
          <p className="venue-description">
            Price: ${venue.price} | Max Guests: {venue.maxGuests}
          </p>

          {isUserLoggedIn ? (
            <div>
              {/* Display success message if booking is successful */}
              {bookingSuccess && <div className="success-message">{bookingSuccess}</div>}

              <div>
                <h3>Select Dates:</h3>
                <DatePicker
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  minDate={new Date()}
                  filterDate={(date) => !isDateDisabled(date)}
                  inline
                />
              </div>
              <div>
                <h3>Select Number of Guests:</h3>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => setGuests((prev) => Math.max(prev - 1, 1))}
                    disabled={guests <= 1}
                    className={styles.button}>
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{guests}</span>
                  <button
                    onClick={() =>
                      setGuests((prev) => Math.min(prev + 1, venue.maxGuests))
                    }
                    disabled={guests >= venue.maxGuests}
                    className={styles.button}>
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleConfirmBooking}
                className={styles.button}
                disabled={!startDate || !endDate || isBooking}>
                {isBooking ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          ) : (
            <p>Please log in to book this venue.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SpecificVenue;
