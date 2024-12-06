import React, { useEffect, useState } from "react";
import { USER_BOOKINGS_ENDPOINT } from "../../Common/constants";
import styles from "../../Button.module.css";

const UserBookings = ({ userName }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userName) {
        setError("No username provided. Please log in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          USER_BOOKINGS_ENDPOINT.replace("{userName}", userName),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "X-Noroff-API-Key": localStorage.getItem("apiKey"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your bookings. Please try again.");
        }

        const { data } = await response.json();
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userName]);

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const response = await fetch(`/holidaze/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "X-Noroff-API-Key": localStorage.getItem("apiKey"),
        },
      });

      if (response.status === 204) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
        alert("Booking deleted successfully.");
      } else {
        throw new Error("Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking. Please try again.");
    }
  };

  const renderBooking = (booking) => (
    <div className="venue booking-card" key={booking.id}>
      <div className="booking-info">
        <p>
          <strong>Booking ID:</strong>
          <br />
          {booking.id}
        </p>
        <p>
          <strong>Check-in:</strong>
          <br />
          {new Date(booking.dateFrom).toLocaleDateString()}
        </p>
        <p>
          <strong>Check-out:</strong>
          <br />
          {new Date(booking.dateTo).toLocaleDateString()}
        </p>
        <p>
          <strong>Guests:</strong>
          <br />
          {booking.guests}
        </p>
        <p>
          <strong>Created At:</strong>
          <br />
          {new Date(booking.created).toLocaleString()}
        </p>
        <button
          onClick={() => handleDeleteBooking(booking.id)}
          className={`${styles.buttondanger} delete-button`}
          aria-label={`Delete booking with ID ${booking.id}`}>
          Delete Booking
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="empty">
        <p>
          No bookings found for <strong>{userName}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      <ul className="bookings-list">
        {bookings.map((booking) => renderBooking(booking))}
      </ul>
    </div>
  );
};

export default UserBookings;
