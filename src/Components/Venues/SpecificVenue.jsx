import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomCalendar from "../Calendar/CustomCalendar";
import { VENUES_API_ENDPOINT } from "../../Common/constants";
import styles from "../../Button.module.css";
import { isAuthenticated } from "../User/authUtils";

const SpecificVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [bookingCart, setBookingCart] = useState([]);
  const isUserLoggedIn = isAuthenticated();

  // Load booking cart from localStorage on mount (this is done only once)
  useEffect(() => {
    const storedCart = localStorage.getItem("bookingCart");
    if (storedCart) {
      setBookingCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Fetch specific venue data
    const fetchVenueData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${VENUES_API_ENDPOINT}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        setVenue(data.data); // Assuming venue data is under `data`
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
        venueId: venue.id,
        venueName: venue.name,
        price: venue.price,
        selectedDateRange: dateRange,
        media: venue.media,
        maxGuests: venue.maxGuests,
      };

      // Avoid adding the same booking if it's already in the cart
      const updatedCart = [...bookingCart, newBooking];
      setBookingCart(updatedCart);

      // Save the updated booking cart to localStorage only if changed
      if (JSON.stringify(updatedCart) !== JSON.stringify(bookingCart)) {
        localStorage.setItem("bookingCart", JSON.stringify(updatedCart));
      }
      alert("Booking added to cart and saved.");
    }
  };

  const handleConfirmBooking = () => {
    // Make sure the cart isn't empty before confirming
    if (bookingCart.length === 0) {
      alert("Please add a booking to the cart before confirming.");
      return;
    }

    alert("Booking confirmed!");

    // Optionally, remove the cart from localStorage if the booking is confirmed
    localStorage.removeItem("bookingCart");

    // Clear the cart state
    setBookingCart([]);
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
      <div className="specific-venue">
        {/* Venue Title */}
        <h2 className="venue-title">{venue.name}</h2>
        <p className="venue-description">
          Price: ${venue.price} | Max Guests: {venue.maxGuests}
        </p>

        {/* Venue Image */}
        {venue.media && venue.media.length > 0 && (
          <div className="specific-venue-image">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || "Venue image"}
              className="specific-venue-image"
            />
          </div>
        )}
        <br />
        
        {/* Booking Calendar */}
        {isUserLoggedIn ? (
          <CustomCalendar onDateRangeSelected={handleDateRangeSelected} />
        ) : (
          <p className="login-prompt">Please log in to book this venue.</p>
        )}
      </div>

      {/* Confirm Booking Button */}
      {bookingCart.length > 0 && (
        <button onClick={handleConfirmBooking} className={styles.button}>
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default SpecificVenue;
