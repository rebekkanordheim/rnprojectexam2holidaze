import React, { useState, useEffect } from "react";
import "../../Layout/App.css";
import { USER_API_UPDATE } from "../../../Common/constants";

function UpdateProfile({ handleVenueManagerChange, isVenueManager, setAvatarImageUrl }) {
  const [imageUrl, setImageUrl] = useState("");
  const [venueManager, setVenueManager] = useState(isVenueManager);
  const [successMessage, setSuccessMessage] = useState("");

  const userName = localStorage.getItem("userName");
  console.log("userName", userName);
  

  useEffect(() => {
    // Load the saved image URL from local storage when the component mounts
    const savedImageUrl = localStorage.getItem("avatarImageUrl");
    if (savedImageUrl !== imageUrl) {
      setImageUrl(savedImageUrl || "");
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value); // Update imageUrl state with user input
  };

  const handleClearImageUrl = () => {
    setImageUrl(""); // Clear imageUrl state
    localStorage.removeItem("avatarImageUrl"); // Remove avatarImageUrl from local storage
  };

  const handleVenueManagerCheckboxChange = (e) => {
    setVenueManager(e.target.checked);
  };

  const updateProfile = async (updates) => {
    try {
      const requestBody = { ...updates };

      const response = await fetch(`${USER_API_UPDATE}/${userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "X-Noroff-API-Key": localStorage.getItem("apiKey"),
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
        updates.avatar = { url: imageUrl, alt: "Profile Avatar" };
      }
      if (venueManager !== isVenueManager) {
        updates.venueManager = venueManager;
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(updates);

        if (imageUrl) {
          // Update localStorage and prop with the new imageUrl
          localStorage.setItem("avatarImageUrl", imageUrl);
          setAvatarImageUrl(imageUrl);
        }
        if (venueManager !== isVenueManager) {
          localStorage.setItem("isVenueManager", JSON.stringify(venueManager));
          handleVenueManagerChange(venueManager);
        }

        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 900);
      } else {
        setSuccessMessage("No changes to update.");
        setTimeout(() => {
          window.location.reload();
        }, 800);
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
            value={imageUrl} // Bind value to imageUrl state
            onChange={handleImageUrlChange} // Update imageUrl state on change
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
