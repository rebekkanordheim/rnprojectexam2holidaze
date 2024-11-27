import React, { useEffect, useState } from "react";
import { USER_BOOKINGS_ENDPOINT } from "../../Common/constants";

const UserBookings = ({ userName }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

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
        console.log(data); // Check response structure
        setBookings(data.data || []); // Assuming the bookings are under 'data'
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userName]);

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
          <li key={booking.id}>
            <p>Venue: {booking.venue?.name || "N/A"}</p>
            <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
