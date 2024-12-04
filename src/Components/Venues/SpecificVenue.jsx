import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomCalendar from "../Calendar/CustomCalendar";
import BookingCart from "./BookingCart";
import { VENUES_API_ENDPOINT } from "../../Common/constants";
import styles from "../../Button.module.css"; // Importing styles for buttons

const SpecificVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [bookingCart, setBookingCart] = useState([]);

  useEffect(() => {
    /**
     * Fetches specific venue data from the API.
     */
    const fetchVenueData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${VENUES_API_ENDPOINT}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        setVenue(data.data);
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
   * Handles date range selection for the booking cart.
   */
  const handleDateRangeSelected = (dateRange) => {
    if (venue) {
      const newBooking = {
        ...venue,
        selectedDateRange: dateRange,
        price: venue.price,
      };

      setBookingCart((prevCart) => [...prevCart, newBooking]);
    }
  };

  if (isLoading) {
    return <div className="loading-message">Loading venue...</div>;
  }

  if (isError) {
    return (
      <div className="error-message">Something went wrong while fetching venue data.</div>
    );
  }

  return (
    <div className="specific-venue-container">
      <div className="venue">
        <h2 className="venue-title">{venue.name}</h2>
        <p className="venue-description">
          Price: ${venue.price} | Max Guests: {venue.maxGuests}
        </p>

        {/* Display venue image */}
        {venue.media && venue.media.length > 0 && (
          <div className="specific-venue-image">
            <img
              className="specific-venue-image"
              src={venue.media[0].url}
              alt={venue.media[0].alt}
            />
          </div>
        )}
        <br />
        {/* Booking Calendar */}
        <CustomCalendar onDateRangeSelected={handleDateRangeSelected} />

        {/* Add to Cart button */}
        <button onClick={() => {}} className={styles.button}>
          Add to Cart
        </button>
      </div>

      {/* Booking Cart */}
      <BookingCart bookingCart={bookingCart} />

      {/* Confirm Booking Button */}
      {bookingCart.length > 0 && (
        <button
          onClick={() => {
            // Call API to confirm booking
          }}
          className={styles.button}>
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default SpecificVenue;
