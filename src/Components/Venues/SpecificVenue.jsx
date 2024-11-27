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
  const loggedIn = isAuthenticated(); // Use your isAuthenticated function here

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

  // Fetch the bookings and extract unavailable dates
  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings");
        const data = await response.json();
        const bookings = data.data;

        // Extract unavailable dates
        const unavailable = bookings.flatMap((booking) => {
          const startDate = new Date(booking.dateFrom);
          const endDate = new Date(booking.dateTo);
          const dates = [];

          let currentDate = startDate;
          while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().split("T")[0]); // format YYYY-MM-DD
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

  // Check venue availability
  const checkAvailability = (selectedStartDate, selectedEndDate) => {
    return fetch("https://v2.api.noroff.dev/holidaze/bookings")
      .then((response) => response.json())
      .then((data) => {
        const bookings = data.data;
        let isAvailable = true;
        bookings.forEach((booking) => {
          const existingStartDate = new Date(booking.dateFrom);
          const existingEndDate = new Date(booking.dateTo);
          if (
            (selectedStartDate >= existingStartDate &&
              selectedStartDate <= existingEndDate) ||
            (selectedEndDate >= existingStartDate &&
              selectedEndDate <= existingEndDate) ||
            (selectedStartDate <= existingStartDate && selectedEndDate >= existingEndDate)
          ) {
            isAvailable = false;
          }
        });
        return isAvailable;
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        return false;
      });
  };

  const handleAddToBookingCart = async () => {
    if (!loggedIn) {
      alert("You need to be logged in to book this venue.");
      return;
    }
    if (!selectedDateRange) {
      alert("Please select a date range before booking.");
      return;
    }

    const isAvailable = await checkAvailability(
      new Date(selectedDateRange.start),
      new Date(selectedDateRange.end)
    );
    if (!isAvailable) {
      alert("The venue is not available for the selected dates.");
      return;
    }

    const booking = {
      venueId: venue.id,
      dateFrom: selectedDateRange.start,
      dateTo: selectedDateRange.end,
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      console.log("Booking successfully created:", data);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error adding booking:", error);
      setIsError(true);
    }
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
          <p className="success-message">Venue successfully booked!</p>
        )}

        <div className="calendar">
          <CustomCalendar
            unavailableDates={unavailableDates} // Pass unavailable dates to CustomCalendar
            onDateRangeSelected={handleDateRangeSelected}
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
