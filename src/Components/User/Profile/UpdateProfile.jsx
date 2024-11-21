import React, { useState, useEffect } from "react";
import "../../Layout/App.css";
import { USER_API_UPDATE } from "../../../Common/constants";

function UpdateProfile({ venueManager, avatarImageUrl, onUpdateProfile }) {
  const [imageUrl, setImageUrl] = useState(avatarImageUrl || "");
  const [isVenueManager, setIsVenueManager] = useState(venueManager); // Local state for checkbox
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userName = localStorage.getItem("userName");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value); // Update image URL state
  };

  const handleClearImageUrl = () => {
    setImageUrl(""); // Clear image URL state
  };

  const handleVenueManagerCheckboxChange = (e) => {
    setIsVenueManager(e.target.checked); // Update local state for checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {};
    if (imageUrl) {
      updates.avatar = { url: imageUrl, alt: "Profile Avatar" }; // Add avatar URL to updates
    }
    if (isVenueManager !== venueManager) {
      updates.venueManager = isVenueManager; // Update venue manager status if changed
    }

    try {
      if (Object.keys(updates).length > 0) {
        await onUpdateProfile(updates); // Call the parent function to update profile
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage(""); // Clear error message if successful
      } else {
        setSuccessMessage("No changes to update.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Error updating profile.");
      setSuccessMessage(""); // Clear success message on error
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
            placeholder="Enter a valid image URL"
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
              disabled={venueManager} // Disable checkbox if the user is already a venue manager
            />
            I want to be a venue manager
          </label>
          {venueManager && (
            <p className="error-message">You are already a venue manager.</p>
          )}
        </div>

        <button type="submit" className="avatar-btn">
          Save
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UpdateProfile;
