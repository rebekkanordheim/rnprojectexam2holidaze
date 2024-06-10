import React, { useState } from "react";
import "../../Layout/App.css";
import { USER_API_UPDATE } from "../../../Common/constants";

function UpdateProfile({
  handleVenueManagerChange,
  isVenueManager,
  setAvatarImageUrl,
  userName,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [venueManager, setVenueManager] = useState(isVenueManager);
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleVenueManagerCheckboxChange = (e) => {
    setVenueManager(e.target.checked);
  };

  const updateProfile = async (updates) => {
    try {
      const { bio, avatar, banner, venueManager } = updates;

      const requestBody = {};

      if (bio) {
        requestBody.bio = bio;
      }
      if (avatar) {
        requestBody.avatar = avatar;
      }
      if (banner) {
        requestBody.banner = banner;
      }
      if (venueManager !== undefined) {
        requestBody.venueManager = venueManager;
      }

      const response = await fetch(`${USER_API_UPDATE}/${userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = {};
      if (imageUrl) {
        updates.avatar = { url: imageUrl };
        localStorage.setItem("avatarImageUrl", imageUrl);
        setAvatarImageUrl(imageUrl);
      }
      if (venueManager !== isVenueManager) {
        updates.venueManager = venueManager;
        localStorage.setItem("isVenueManager", JSON.stringify(venueManager));
        handleVenueManagerChange(venueManager);
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(updates);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        setSuccessMessage("No changes to update.");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }

      // Reset the checkbox
      setVenueManager(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="formContainer">
      <h2>Update your profile:</h2>
      <form onSubmit={handleSubmit} className="avatarform">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="avatar-input"
        />
        {/* <img src={imageUrl} alt="" className="avatar-image" /> */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={venueManager}
              onChange={handleVenueManagerCheckboxChange}
            />
            I want to be a venue manager
          </label>
        </div>
        <button type="submit" className="avatar-btn">
          Save
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default UpdateProfile;
