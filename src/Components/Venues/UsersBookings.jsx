import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const USER_BOOKINGS_ENDPOINT = `https://v2.api.noroff.dev/holidaze/profiles/{userName}/bookings`;

function UserBookings() {
  const { name } = useParams(); // Assuming 'name' is the parameter in your route
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setIsLoading(true);

        const jwtToken = localStorage.getItem("jwtToken");
        const apiKey = localStorage.getItem("apiKey");

        const response = await fetch(USER_BOOKINGS_ENDPOINT.replace("{userName}", name), {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user bookings");
        }

        const data = await response.json();
        setUserBookings(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, [name]);

  if (isLoading) {
    return <div>Loading user bookings...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (userBookings.length === 0) {
    return <div>No bookings found for {name}</div>;
  }

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      <ul>
        {userBookings.map((booking) => (
          <li key={booking.id}>
            <p>
              <strong>Booking ID:</strong> {booking.id}
            </p>
            <p>
              <strong>Check-in:</strong> {booking.dateFrom}
            </p>
            <p>
              <strong>Check-out:</strong> {booking.dateTo}
            </p>
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
            {/* Additional booking details can be displayed here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBookings;
