import React, { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import UserMadeVenues from "../../Venues/UserMadeVenues";
import UserBookings from "../../Venues/UsersBookings"; // Make sure this is imported correctly
import { USER_API_UPDATE } from "../../../Common/constants";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: {
      url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400", // Default image
      alt: "Profile Avatar",
    },
    venueManager: false,
  });

  const [message, setMessage] = useState(""); // State to show success/error message
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "X-Noroff-API-Key": localStorage.getItem("apiKey"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          name: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar || userData.avatar,
          venueManager: data.data.venueManager,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userName) {
      fetchUserProfile();
    }
  }, [userName]);

  // Handle profile update, ensuring avatar and venueManager are handled separately
  const handleUpdateProfile = async (updates) => {
    // Ensure we compare current state with updates to check for changes
    const updatedAvatar = updates.avatar ? updates.avatar : userData.avatar;
    const updatedVenueManager =
      updates.venueManager !== undefined ? updates.venueManager : userData.venueManager;

    // Check if the updates actually change any data
    if (
      updates.name === userData.name &&
      updates.email === userData.email &&
      updatedAvatar.url === userData.avatar.url &&
      updatedVenueManager === userData.venueManager
    ) {
      setMessage("No changes made");
      return; // Prevent the API call if no changes
    }

    try {
      const updatedData = {
        ...updates, // Include any changes made to name, email, etc.
        avatar: updatedAvatar,
        venueManager: updatedVenueManager,
      };

      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();

      // Update the state with the new data
      setUserData((prev) => ({
        ...prev,
        ...updates,
        avatar: updatedAvatar,
        venueManager: updatedVenueManager,
      }));

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-header">
        <img
          src={userData.avatar.url}
          alt={userData.avatar.alt || "Profile Avatar"}
          className="profile-avatar"
        />
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>

      <div className="update-profile-form">
        <h2>Update Profile</h2>
        <UpdateProfile
          avatarImageUrl={userData.avatar.url}
          venueManager={userData.venueManager}
          onUpdateProfile={handleUpdateProfile}
        />
      </div>

      {message && <p className="message">{message}</p>}

      <div className="user-venues-section">
        <UserMadeVenues userName={userName} />
      </div>
      <div className="user-venues-section">
        <UserBookings userName={userName} /> {/* User bookings */}
      </div>
    </div>
  );
};

export default Profile;
