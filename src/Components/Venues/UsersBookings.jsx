import React, { useEffect, useState } from "react";
import { USER_BOOKINGS_ENDPOINT } from "../../Common/constants";

const UserBookings = ({ userName }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
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
        setBookings(data.data || []); // Assuming the bookings are under 'data'
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userName) {
      fetchBookings();
    }
  }, [userName]);

  if (bookings.length === 0) {
    return <p>No bookings found for {userName}.</p>;
  }

  return (
    <div>
      <h2>User Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <p>Venue: {booking.venue.name}</p>
            <p>Check-in: {booking.checkIn}</p>
            <p>Check-out: {booking.checkOut}</p>
            {/* Add any other relevant booking details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
