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
        setError("No username provided.");
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
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        console.log(data);
        setBookings(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again.");
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
      const response = await fetch(
        `${USER_BOOKINGS_ENDPOINT.replace("{userName}", userName)}/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      // Remove the deleted booking from local state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      alert("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Error deleting booking. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (bookings.length === 0) {
    return <p>No bookings found for {userName}.</p>;
  }

  return (
    <div>
      <h2>User Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li className="userbookings-list" key={booking.id}>
            <p>
              <strong>Booking ID:</strong> {booking.id}
            </p>
            <p>
              <strong>Check-in:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong> {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(booking.created).toLocaleString()}
            </p>
            <button
              className={styles.buttondanger}
              onClick={() => handleDeleteBooking(booking.id)}>
              Delete Booking
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
