import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import UpdateUserImage from "./UpdateUserImage";

function Profile() {
  const { name } = useParams();
  const [userName, setUserName] = useState("");
  const [avatarImageUrl, setAvatarImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        setIsLoading(true);

        const storedUserName = localStorage.getItem("userName");
        const storedAvatarImageUrl = localStorage.getItem("avatarImageUrl");

        if (!storedUserName || !storedAvatarImageUrl) {
          throw new Error("User data not found in local storage");
        }

        setUserName(storedUserName);
        setAvatarImageUrl(storedAvatarImageUrl);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [name]);

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
        <UpdateUserImage />
      </div>
    </div>
  );
}

export default Profile;
