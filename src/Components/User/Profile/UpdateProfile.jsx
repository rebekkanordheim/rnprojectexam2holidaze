import React, { useState, useEffect } from "react";
import "../../Layout/App.css";
import { USER_API_UPDATE } from "../../../Common/constants";

function UpdateProfile({ handleVenueManagerChange, venueManager, setAvatarImageUrl }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(venueManager); // Use local state for checkbox
  const [successMessage, setSuccessMessage] = useState("");

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    // Load the saved image URL from local storage when the component mounts
    const savedImageUrl = localStorage.getItem("avatarImageUrl");
    if (savedImageUrl !== imageUrl) {
      setImageUrl(savedImageUrl || "");
    }
  }, [imageUrl]);

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleClearImageUrl = () => {
    setImageUrl("");
    localStorage.removeItem("avatarImageUrl");
  };

  const handleVenueManagerCheckboxChange = (e) => {
    setIsVenueManager(e.target.checked); // Update local state based on checkbox value
  };

  // Function to update profile by sending data to the API
  const updateProfile = async (updates) => {
    try {
      const response = await fetch(`${USER_API_UPDATE}/${userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "X-Noroff-API-Key": localStorage.getItem("apiKey"),
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return await response.json(); // Return updated profile data
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {};
    if (imageUrl) {
      updates.avatar = { url: imageUrl, alt: "Profile Avatar" }; // Update avatar
    }
    if (isVenueManager !== venueManager) {
      updates.venueManager = isVenueManager; // Update venue manager status if changed
    }

    try {
      if (Object.keys(updates).length > 0) {
        // Send the updates to the API
        await updateProfile(updates);

        // Update the local state and local storage
        if (imageUrl) {
          localStorage.setItem("avatarImageUrl", imageUrl);
          setAvatarImageUrl(imageUrl);
        }
        if (isVenueManager !== venueManager) {
          localStorage.setItem("venueManager", JSON.stringify(isVenueManager));
          handleVenueManagerChange(isVenueManager); // Update venue manager in parent
        }

        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => {
          window.location.reload(); // Optionally reload the page to reflect the changes
        }, 900);
      } else {
        setSuccessMessage("No changes to update.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="formContainer">
      <h2>Update your profile:</h2>
      <form onSubmit={handleSubmit} className="avatarform">
        <label htmlFor="imageUrl">Image URL:</label>
        <div className="image-url-input">
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="avatar-input"
          />
          {imageUrl && (
            <button
              type="button"
              className="clear-image-url"
              onClick={handleClearImageUrl}>
              Clear
            </button>
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isVenueManager}
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
