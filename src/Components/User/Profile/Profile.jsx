import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import UpdateProfile from "./UpdateProfile";
import { USER_API_UPDATE } from "../../../Common/constants";
import UserBookings from "../../Venues/UsersBookings";

/**
 * Profile component displaying the user's name and image fetched from localStorage.
 *
 * @returns {JSX.Element} JSX element representing the Profile component.
 */
function Profile() {
  const { name } = useParams();
  const [userName, setUserName] = useState("");
  const [avatarImageUrl, setAvatarImageUrl] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        setIsLoading(true);

        const storedUserName = localStorage.getItem("userName");
        const storedAvatarImageUrl = localStorage.getItem("imageUrl");
        const storedIsVenueManager = JSON.parse(localStorage.getItem("isVenueManager"));

        if (storedUserName === null || storedAvatarImageUrl === null) {
          throw new Error("User data not found in local storage");
        }

        setUserName(storedUserName);
        setAvatarImageUrl(storedAvatarImageUrl);
        setIsVenueManager(storedIsVenueManager || false);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [name]);

  const handleVenueManagerChange = async (newValue) => {
    try {
      const response = await fetch(`${USER_API_UPDATE}/${name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venueManager: newValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update venue manager status");
      }

      const data = await response.json();
      localStorage.setItem("isVenueManager", JSON.stringify(newValue));
      setIsVenueManager(newValue);
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

  if (!userName) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Holidaze | {userName}</title>
      </Helmet>
      <div className="profile-container">
        <h1>Welcome, {userName}!</h1>
        {avatarImageUrl && (
          <img src={avatarImageUrl} alt="User Avatar" className="avatar-image" />
        )}
        {isVenueManager && (
          <p className="venue-manager-status">You are a venue manager.</p>
        )}
        <UpdateProfile
          handleVenueManagerChange={handleVenueManagerChange}
          isVenueManager={isVenueManager}
          setAvatarImageUrl={setAvatarImageUrl}
        />
        <UserBookings />
      </div>
    </div>
  );
}

export default Profile;
