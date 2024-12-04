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
        setBookings(data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again.");
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
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bookings.length === 0) {
    return <p>No bookings found for {userName}.</p>;
  }

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <div className=" venue" key={booking.id}>
            <div className="booking-info">
              <p>
                Booking ID:
                <br />
                {booking.id}
              </p>
              <p>
                Check-in:
                <br /> {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p>
                Check-out: <br />
                {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <p>
                Guests: <br />
                {booking.guests}
              </p>
              <p>
                Created At:
                <br />
                {new Date(booking.created).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteBooking(booking.id)}
                className={styles.buttondanger}>
                Delete Booking
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
