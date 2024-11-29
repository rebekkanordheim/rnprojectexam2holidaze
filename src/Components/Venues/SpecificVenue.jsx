import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomCalendar from "../Calendar/CustomCalendar";
import BookingCart from "./BookingCart";

const SpecificVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [bookingCart, setBookingCart] = useState([]); // State for the booking cart

  useEffect(() => {
    async function fetchVenueData() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        console.log("Venue data:", data); // Debugging log
        setVenue(data.data); // Use 'data.data' as per your API response structure
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenueData();
  }, [id]);

  // Handle the date range selection from the CustomCalendar component
  const handleDateRangeSelected = (dateRange) => {
    console.log("Selected date range:", dateRange);

    if (venue) {
      // Add the selected date range to the booking cart
      const newBooking = {
        ...venue,
        selectedDateRange: dateRange, // Add the selected date range
        price: venue.price, // Add the price
      };

      // Update the booking cart state
      setBookingCart((prevCart) => [...prevCart, newBooking]);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong while fetching venue data.</p>;
  }

  return (
    <div className="venue-container">
      <div className="venue-info">
        <h2 className="venue-title">{venue.name}</h2>
        {venue.media?.length > 0 ? (
          <img
            className="venue-image"
            src={venue.media[0].url}
            alt={venue.media[0].alt || `Image of ${venue.name}`}
          />
        ) : (
          <img
            className="venue-image"
            src="/path/to/placeholder-image.jpg"
            alt="No image available"
          />
        )}
        <p>Price per night: ${venue.price}</p>
        <p>Max guests: {venue.maxGuests}</p>
      </div>

      <CustomCalendar
        onDateRangeSelected={handleDateRangeSelected} // Pass the date range handler to CustomCalendar
      />

      <BookingCart
        bookingCart={bookingCart} // Pass the booking cart state to BookingCart
        setBookingCart={setBookingCart} // Pass the setter function to BookingCart
      />
    </div>
  );
};

export default SpecificVenue;
