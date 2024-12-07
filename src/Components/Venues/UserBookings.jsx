import React, { useEffect, useState } from "react";
import { USER_BOOKINGS_ENDPOINT } from "../../Common/constants";

/**
 * Component for displaying a user's bookings.
 *
 * Fetches the bookings of a specific user and displays them in a list.
 * Displays loading, error, or empty state based on the API response.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.userName - The username of the logged-in user.
 * @returns {JSX.Element} The UserBookings component.
 */
const UserBookings = ({ userName }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the bookings for the provided username from the API.
   * Sets loading, error, and bookings state based on the response.
   */
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

  /**
   * Renders a single booking card displaying the booking details.
   *
   * @param {Object} booking - The booking data.
   * @param {string} booking.id - The unique booking ID.
   * @param {string} booking.dateFrom - The check-in date.
   * @param {string} booking.dateTo - The check-out date.
   * @param {number} booking.guests - The number of guests for the booking.
   * @param {string} booking.created - The creation date of the booking.
   * @returns {JSX.Element} A booking card component displaying the booking details.
   */
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
