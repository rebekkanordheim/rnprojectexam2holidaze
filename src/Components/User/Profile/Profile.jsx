import React, { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile"; 

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: {
      url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400", // Default image
      alt: "Profile Avatar",
    },
    venueManager: false,
  });

  const [avatarImageUrl, setAvatarImageUrl] = useState("");

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    // Fetch user profile data from the API
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
        const avatarUrl = data?.data?.avatar?.url;

        // Set fetched data into state
        setUserData({
          name: data.data.name,
          email: data.data.email,
          bio: data.data.bio || "No bio available.",
          avatar: data.data.avatar || userData.avatar, // Fallback to default avatar if not found
          venueManager: data.data.venueManager,
        });

        // Set avatarImageUrl from API response
        setAvatarImageUrl(avatarUrl || userData.avatar.url); // Fallback to default image if not found
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userName) {
      fetchUserProfile(); // Fetch user profile when component mounts
    }
  }, [userName]); // Only re-run if userName changes

  useEffect(() => {
    // Update localStorage when avatarImageUrl changes
    if (avatarImageUrl) {
      localStorage.setItem("avatarImageUrl", avatarImageUrl); // Save avatar image URL to localStorage
    }
  }, [avatarImageUrl]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-header">
        {/* Show the avatar image based on avatarImageUrl */}
        <img
          src={avatarImageUrl || userData.avatar.url} // Use avatarImageUrl from state or fallback to default
          alt={userData.avatar.alt || "Profile Avatar"} // Use alt text from the avatar or fallback to default
          className="profile-avatar"
        />
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>
      <div className="profile-details">
        <p>
          <strong>Bio:</strong> {userData.bio}
        </p>
      </div>

      {/* Pass setAvatarImageUrl to UpdateProfile component */}
      <div className="update-profile-form">
        <h2>Update Profile</h2>
        <UpdateProfile
          userName={userData.name}
          avatarImageUrl={avatarImageUrl}
          setAvatarImageUrl={setAvatarImageUrl} // Allow UpdateProfile to modify avatar image URL
          setUserData={setUserData} // Allow UpdateProfile to update userData
        />
      </div>
    </div>
  );
};

export default Profile;
