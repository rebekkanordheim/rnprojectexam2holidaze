import React, { useEffect, useState } from "react";
import UpdateAvatarUrl from "./UpdateAvatarUrl";
import UpdateVenueManager from "./UpdateVenueManager";
import UserMadeVenues from "../../Venues/UserMadeVenues";
import UserBookings from "../../Venues/UserBookings";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: {
      url: "",
      alt: "Profile Avatar",
    },
    venueManager: false,
  });
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

        const { data } = await response.json(); // Extract 'data' from the response
        setUserData({
          name: data.name,
          email: data.email,
          avatar: data.avatar || userData.avatar,
          venueManager: data.venueManager,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userName) {
      fetchUserProfile();
    }
  }, [userName]);

  const handleUpdateAvatar = async (newAvatar) => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
          body: JSON.stringify({ avatar: newAvatar }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }

      setUserData((prev) => ({
        ...prev,
        avatar: newAvatar,
      }));
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleUpdateVenueManager = async (newVenueManagerStatus) => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
          body: JSON.stringify({ venueManager: newVenueManagerStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update venue manager status");
      }

      setUserData((prev) => ({
        ...prev,
        venueManager: newVenueManagerStatus,
      }));
    } catch (error) {
      console.error("Error updating venue manager status:", error);
    }
  };

  return (
    <div className="profile-container padded rounded">
      <h1 className="text-center">Profile</h1>
      <div className="profile-header flex-center">
        <img
          src={userData.avatar.url}
          alt={userData.avatar.alt || "Profile Avatar"}
          className="profile-avatar rounded transition"
        />
        <div className="profile-info text-center">
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
        </div>
      </div>

      <div className="update-profile-section">
        <br />
        <h3>Update Image</h3>
        <UpdateAvatarUrl
          avatarImageUrl={userData.avatar.url}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <br />
        <h3>Update Venue Manager</h3>
        <UpdateVenueManager
          venueManager={userData.venueManager}
          onUpdateVenueManager={handleUpdateVenueManager}
        />
      </div>

      <div className="user-venues-section venues-container">
        <UserMadeVenues userName={userName} />
      </div>
      <div className="user-bookings-section venues-container">
        <UserBookings userName={userName} />
      </div>
    </div>
  );
};

export default Profile;
