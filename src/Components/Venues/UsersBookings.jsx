import React, { useState, useEffect } from "react";

function UserBookings({ userName }) {
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = () => {
      try {
        setIsLoading(true);

        // Retrieve bookings from localStorage
        const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];

        if (bookings.length === 0) {
          setError("No bookings found.");
        } else {
          // Filter bookings by userName, if necessary
          const filteredBookings = bookings.filter(
            (booking) => booking.userName === userName
          );
          setUserBookings(filteredBookings);
        }
      } catch (error) {
        setError("Failed to fetch bookings from localStorage.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, [userName]);

  const handleDeleteBooking = (bookingId) => {
    // Delete logic for a booking
    const updatedBookings = userBookings.filter((booking) => booking.id !== bookingId);
    setUserBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
  };

  if (isLoading) {
    return <div>Loading your bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {userBookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {userBookings.map((booking) => (
            <div className="specific-user-booking" key={booking.id}>
              <h3>{booking.title}</h3>
              <p>Booked Date: {new Date(booking.bookedDate).toLocaleDateString()}</p>
              <p>Price: ${booking.price}</p>
              <button
                onClick={() => handleDeleteBooking(booking.id)}
                className="delete-booking-btn btn btn-danger">
                Cancel Booking
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBookings;
