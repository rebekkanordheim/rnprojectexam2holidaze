import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomCalendar from "./CustomCalendar"; // Assuming you have a custom calendar component
import { Helmet } from "react-helmet";
import { isAuthenticated } from "../User/authUtils";

function SpecificVenue({ addToBookingCart }) {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [numGuests, setNumGuests] = useState(1); // Added numGuests state
  const loggedIn = isAuthenticated();

  // Fetch the venue details
  useEffect(() => {
    async function fetchVenueData() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        setVenue(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchVenueData();
  }, [id]);

  // Fetch bookings and extract unavailable dates
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        const bookings = data.data;

        // Extract unavailable dates
        const unavailable = bookings.flatMap((booking) => {
          const startDate = new Date(booking.dateFrom);
          const endDate = new Date(booking.dateTo);
          const dates = [];
          let currentDate = startDate;

          while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
            currentDate.setDate(currentDate.getDate() + 1);
          }

          return dates;
        });

        setUnavailableDates(unavailable);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, []);

  const handleDateRangeSelected = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleAddToBookingCart = async () => {
    if (!loggedIn) {
      alert("You need to be logged in to book this venue.");
      return;
    }
    if (!selectedDateRange || !numGuests) {
      alert("Please select a valid date range and number of guests before booking.");
      return;
    }

    // Ensure selected dates are available
    const selectedStartDate = selectedDateRange.start;
    const selectedEndDate = selectedDateRange.end;
    const isAvailable = !unavailableDates.some(
      (date) => date >= selectedStartDate && date <= selectedEndDate
    );

    if (!isAvailable) {
      alert("The venue is not available for the selected dates.");
      return;
    }

    const booking = {
      venueId: venue.id,
      name: venue.name, // Add the venue name
      price: venue.price, // Add the price
      media: venue.media, // Add media for image display
      selectedDateRange, // Add selected date range
      guests: numGuests, // Add number of guests
    };

    // Add the new booking to the booking cart (this assumes setBookingCart is passed as a prop)
    addToBookingCart(booking);

    // Optionally, you can display a success message
    setShowSuccessMessage(true);
  };

  if (isLoading) {
    return <div>Loading venue details...</div>;
  }

  if (isError || !venue) {
    return <div>Error loading venue details.</div>;
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
          <i>Wifi:</i> {venue.meta.wifi ? "Yes" : "No"}
        </p>
        <p>
          <i>Breakfast:</i> {venue.meta.breakfast ? "Included" : "Not Included"}
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
          <p className="success-message">Venue successfully added to cart!</p>
        )}

        <div className="calendar">
          <CustomCalendar
            unavailableDates={unavailableDates} // Pass unavailable dates
            onDateRangeSelected={handleDateRangeSelected}
          />
        </div>

        <div className="guests">
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            value={numGuests}
            min="1"
            max={venue.maxGuests} // Restrict the number of guests to the venue's max capacity
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </div>

        <button onClick={handleAddToBookingCart} className="btn">
          Add to Booking Cart
        </button>
      </div>
    </div>
  );
}

export default SpecificVenue;
