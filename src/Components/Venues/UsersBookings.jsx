import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "../../Button.module.css"; // Assuming you have the Button.module.css in this path

function UserBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve bookings from local storage
    const storedBookings = localStorage.getItem("userBookings");
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings);
      setBookings(parsedBookings);
    }
  }, []);

  return (
    <div className="formContainer">
      <Helmet>
        <title>Holidaze | Your Bookings</title>
      </Helmet>
      <h2>Your Bookings:</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="bookingCard">
            <h3 className="venue-title">{booking.name}</h3>
            <p>
              <i>Description:</i> {booking.description}
            </p>
            {booking.media && booking.media.length > 0 && (
              <img
                className="venue-image"
                src={booking.media[0].url}
                alt={booking.media[0].alt || "Booking Media"}
              />
            )}
            <p>
              <i>Address:</i> {booking.location.address}, {booking.location.city},{" "}
              {booking.location.country}
            </p>
            <p>
              <i>Max Guests:</i> {booking.maxGuests}
            </p>
            <p>
              <i>Price:</i> ${booking.price}
            </p>
            <p>
              <i>Booking Dates:</i>{" "}
              {new Date(booking.selectedDateRange.start).toLocaleDateString()} -{" "}
              {new Date(booking.selectedDateRange.end).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}

export default UserBookings;
