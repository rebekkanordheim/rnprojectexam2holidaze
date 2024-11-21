import React, { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";

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

  const handleUpdateProfile = async (updates) => {
    try {
      // Ensure avatar is always included in the updates if not explicitly changed
      if (!updates.avatar) {
        updates.avatar = userData.avatar;
      }

      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      setUserData((prev) => ({
        ...prev,
        ...updates, // Merge the updates into the existing userData
        avatar: updates.avatar, // Ensure the avatar is explicitly updated
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
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
    </div>
  );
};

export default Profile;
