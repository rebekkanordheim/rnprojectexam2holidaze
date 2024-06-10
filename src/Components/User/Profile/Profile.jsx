import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import UpdateProfile from "./UpdateProfile";
import UserBookings from "../../Venues/UsersBookings";
import { isAuthenticated } from "../authUtils";
import defaultImage from "../../../images/default.jpg";

/**
 * Profile component to display user profile information.
 * @returns {JSX.Element} Profile component JSX
 */
function Profile() {
  const { name } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches user data from local storage.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Check if the user is authenticated
        if (!isAuthenticated()) {
          // Redirect the user to the login page or handle unauthorized access
          return;
        }

        // Retrieve user data from local storage
        const imageUrl = localStorage.getItem("imageUrl");
        const userName = localStorage.getItem("userName");
        const venueManager = localStorage.getItem("venueManager") === "true";

        if (!imageUrl || !userName) {
          throw new Error("User data not found in local storage");
        }

        setUserData({ imageUrl, userName, venueManager });
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [name]);

  /**
   * Handles the change in venue manager status.
   * @param {boolean} newValue - The new value for venue manager status
   * @returns {string} Success message
   * @throws {Error} If failed to update venue manager status
   */
  const handleVenueManagerChange = (newValue) => {
    try {
      // Update venue manager status in local storage and state
      const updatedUserData = { ...userData, venueManager: newValue };
      setUserData(updatedUserData);
      localStorage.setItem("venueManager", newValue.toString());

      return "Venue manager status updated successfully!";
    } catch (error) {
      throw new Error(`Failed to update venue manager status: ${error.message}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Holidaze | {userData.userName}</title>
      </Helmet>
      <div className="profile-container">
        <h1>Welcome, {userData.userName}!</h1>
        <img
          src={userData.imageUrl || {defaultImage}}
          alt="User Avatar"
          className="avatar-image"
        />
        {userData.venueManager && (
          <p className="venue-manager-status">You are a venue manager.</p>
        )}
        <UpdateProfile
          handleVenueManagerChange={handleVenueManagerChange}
          isVenueManager={userData.venueManager}
          setAvatarImageUrl={(url) => setUserData({ ...userData, imageUrl: url })}
        />
        <UserBookings />
      </div>
    </div>
  );
}

export default Profile;
