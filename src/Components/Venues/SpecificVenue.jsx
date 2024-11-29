import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomCalendar from "./CustomCalendar";
import { Helmet } from "react-helmet";
import { isAuthenticated } from "../User/authUtils";

function SpecificVenue({ addToBookingCart }) {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const loggedIn = isAuthenticated();

  useEffect(() => {
    async function fetchVenueData() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const data = await response.json();
        console.log("Fetched venue data:", data);
        setVenue(data.data);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenueData();
  }, [id]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        console.log("Fetched bookings data:", data);

        const bookings = data.data || [];
        if (Array.isArray(bookings)) {
          const unavailable = bookings.flatMap((booking) => {
            const startDate = new Date(booking.dateFrom);
            const endDate = new Date(booking.dateTo);
            const dates = [];
            let currentDate = startDate;

            while (currentDate <= endDate) {
              dates.push(currentDate.toISOString().split("T")[0]);
              currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
          });

          setUnavailableDates(unavailable);
        } else {
          console.error("Unexpected bookings format:", bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, []);

  const handleBookingSubmit = (bookingDetails) => {
    if (!loggedIn) {
      alert("You need to be logged in to book this venue.");
      return;
    }

    const booking = {
      venueId: venue.id,
      name: venue.name,
      price: venue.price,
      media: venue.media,
      selectedDateRange: [bookingDetails.startDate, bookingDetails.endDate],
      guests: bookingDetails.guests,
      totalCost: bookingDetails.totalCost,
    };

    addToBookingCart(booking);
    setShowSuccessMessage(true);
  };

  if (isLoading) return <div>Loading venue details...</div>;
  if (isError || !venue) return <div>Error loading venue details.</div>;

  return (
    <div key={venue.id} className="venue">
      <Helmet>
        <title>Holidaze | {venue?.name || "Loading..."}</title>
      </Helmet>
      <div className="venue-info">
        <h2 className="venue-title">{venue.name}</h2>
        {venue.media?.length > 0 ? (
          <img
            className="venue-image"
            src={venue.media[0]?.url || ""}
            alt={venue.media[0]?.alt || "Venue image"}
          />
        ) : (
          <p>No images available for this venue.</p>
        )}

        {/* Calendar Component */}
        <CustomCalendar
          bookings={unavailableDates.map((date) => ({
            dateFrom: date,
            dateTo: date,
          }))}
          pricePerNight={venue.price || 100}
          maxGuests={venue.maxGuests || 10}
          onBookingSubmit={handleBookingSubmit}
        />

        {/* Success Message */}
        {showSuccessMessage && <p>Booking added to cart successfully!</p>}
      </div>
    </div>
  );
}

export default SpecificVenue;
