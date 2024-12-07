import React, { useEffect, useState } from "react";
import UpdateAvatarUrl from "./UpdateAvatarUrl";
import UpdateVenueManager from "./UpdateVenueManager";
import UserMadeVenues from "../../Venues/UserMadeVenues";
import UserBookings from "../../Venues/UserBookings";

/**
 * Profile component displays and allows the user to update their profile information.
 * This includes updating the avatar image and venue manager status, as well as viewing
 * the user's created venues and bookings.
 * @component
 */
const Profile = () => {
  /** State to manage user profile data. */
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: {
      url: "",
      alt: "Profile Avatar",
    },
    venueManager: false,
  });

  /** The logged-in user's name, retrieved from localStorage. */
  const userName = localStorage.getItem("userName");

  /**
   * Fetches the user's profile data when the component mounts.
   * @async
   * @function
   * @throws {Error} If the fetch request fails.
   */
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

        const { data } = await response.json();
        setUserData({
          name: data.name,
          email: data.email,
          avatar: data.avatar,
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

  /**
   * Updates the user's avatar in the profile.
   * @async
   * @function
   * @param {Object} newAvatar - The new avatar data.
   * @throws {Error} If the update request fails.
   */
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

  /**
   * Updates the user's venue manager status in the profile.
   * @async
   * @function
   * @param {boolean} newVenueManagerStatus - The new venue manager status.
   * @throws {Error} If the update request fails.
   */
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
