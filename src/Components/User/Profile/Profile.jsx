import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import UpdateProfile from "./UpdateProfile";
import UserBookings from "../../Venues/UsersBookings";
import UserMadeVenues from "../../Venues/UserMadeVenues";
import { isAuthenticated } from "../authUtils";
import defaultImage from "../../../images/default.jpg";

function Profile() {
  const { name } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBookings, setUserBookings] = useState([]); // Add state for user bookings

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Check if the user is authenticated
        if (!isAuthenticated()) {
          setError("You are not authorized to view this page.");
          return;
        }

        // Retrieve user data from local storage
        const imageUrl = localStorage.getItem("imageUrl") || defaultImage;
        const userName = localStorage.getItem("userName") || name;
        const venueManager = localStorage.getItem("venueManager") === "true";

        if (!userName) {
          throw new Error("User data not found in local storage");
        }

        setUserData({ imageUrl, userName, venueManager });
        setIsLoading(false);

        // Retrieve user bookings from local storage
        const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];

        // Convert the bookedDate to a valid date format if necessary
        const updatedBookings = bookings.map((booking) => {
          // Check if the bookedDate is a valid date
          const validDate = new Date(booking.bookedDate);
          if (isNaN(validDate)) {
            console.warn(`Invalid date format: ${booking.bookedDate}`);
            booking.bookedDate = ""; // Reset to empty string if invalid
          }
          return booking;
        });

        setUserBookings(updatedBookings); // Set the bookings to state
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [name]);

  const handleVenueManagerChange = (newValue) => {
    const updatedUserData = { ...userData, venueManager: newValue };
    setUserData(updatedUserData);
    localStorage.setItem("venueManager", newValue.toString());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Holidaze | {userData.userName}</title>
      </Helmet>
      <div className="profile-container">
        <h1>Welcome, {userData.userName}!</h1>
        <img src={userData.imageUrl} alt="User Avatar" className="avatar-image" />

        {userData.venueManager && (
          <p className="venue-manager-status">You are a venue manager.</p>
        )}

        <UpdateProfile
          handleVenueManagerChange={handleVenueManagerChange}
          venueManager={userData.venueManager}
          setAvatarImageUrl={(url) => {
            setUserData({ ...userData, imageUrl: url });
            localStorage.setItem("imageUrl", url);
          }}
        />

        {/* Render user bookings */}
        <h2>Your Bookings</h2>
        {userBookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <div className="user-venues">
            {userBookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <h3>{booking.title}</h3> {/* Display the title */}
                <p>{booking.description}</p> {/* Display the description */}
                <p>Price: ${booking.price.toFixed(2)}</p> {/* Display the price */}
                {/* Ensure the bookedDate is valid before formatting */}
                <p>
                  Booked Date:{" "}
                  {booking.bookedDate
                    ? new Date(booking.bookedDate).toLocaleDateString()
                    : "Invalid Date"}
                </p>
                {/* Add more details if needed */}
              </div>
            ))}
          </div>
        )}

        {/* Display user-made venues */}
        <h2>Your Created Venues</h2>
        <UserMadeVenues userName={userData.userName} />
      </div>
    </div>
  );
}

export default Profile;
