import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../Button.module.css";
import { Helmet } from "react-helmet";
import { isLoggedIn } from "../User/authUtils";
import CustomCalendar from "../Calendar/CustomCalendar";

/**
 * SpecificVenue component displays detailed information about a specific venue.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.addToBookingCart - Function to add the venue to the booking cart.
 * @returns {JSX.Element} JSX element representing the SpecificVenue component.
 */
function SpecificVenue({ addToBookingCart }) {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setVenue(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleDateRangeSelected = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleAddToBookingCart = () => {
    const booking = {
      ...venue,
      selectedDateRange: selectedDateRange,
    };

    addToBookingCart(booking);

    // Add booking to bookingCart in localStorage
    const bookingCart = JSON.parse(localStorage.getItem("bookingCart")) || [];
    bookingCart.push(booking);
    localStorage.setItem("bookingCart", JSON.stringify(bookingCart));

    // Add booking to userBookings in localStorage
    const userBookings = JSON.parse(localStorage.getItem("userBookings")) || [];
    userBookings.push(booking);
    localStorage.setItem("userBookings", JSON.stringify(userBookings));

    setShowSuccessMessage(true);
    console.log("Venue added to booking cart:", venue);
  };

  if (isLoading) {
    return <div>Loading venue...</div>;
  }

  if (isError || !venue) {
    return <div>Error loading venue</div>;
  }

  return (
    <div key={venue.id} className="venue">
      <Helmet>
        <title>Holidaze | {venue.name}</title>
      </Helmet>
      <div className="venue-info">
        <h2 className="venue-title">{venue.name}</h2>
        <p>
          <i>Address:</i> {venue.address}
        </p>
        <p>
          <i>Max Guests:</i> {venue.maxGuests}
        </p>
        <p>
          <i>Wifi:</i> {venue.wifi ? "Yes" : "No"}
        </p>
        <p>
          <i>Breakfast:</i> {venue.breakfast ? "Included" : "Not Included"}
        </p>
        <p>
          <i>Description:</i> {venue.description}
        </p>
        <p>
          <i>Price:</i> ${venue.price}
        </p>
        {venue.media.length > 0 && (
          <img
            className="venue-image"
            src={venue.media[0].url}
            alt={venue.media[0].alt}
          />
        )}
        {showSuccessMessage && (
          <p className="success-message">Venue added to booking cart!</p>
        )}
        <div className="calendar">
          <CustomCalendar onDateRangeSelected={handleDateRangeSelected} />
        </div>
        {loggedIn && (
          <button
            type="submit"
            className={styles.button}
            onClick={handleAddToBookingCart}>
            Add to Booking Cart
          </button>
        )}
        {!loggedIn && (
          <p className="error-message">You need to be logged in to book this venue</p>
        )}
      </div>
    </div>
  );
}

export default SpecificVenue;
