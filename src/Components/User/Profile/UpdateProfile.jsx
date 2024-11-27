import React, { useState } from "react";
import "../../Layout/App.css";
import styles from "../../../Button.module.css";

function UpdateProfile({ venueManager, avatarImageUrl, onUpdateProfile }) {
  const [imageUrl, setImageUrl] = useState(avatarImageUrl || "");
  const [isVenueManager, setIsVenueManager] = useState(venueManager); // Local state for checkbox
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value); // Update image URL state
  };

  const handleVenueManagerCheckboxChange = (e) => {
    setIsVenueManager(e.target.checked); // Update local state for checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any changes
    if (imageUrl === avatarImageUrl && isVenueManager === venueManager) {
      setSuccessMessage(""); // Clear previous success message
      setErrorMessage("No changes made."); // Show a message indicating no changes
      return; // Stop execution
    }

    // Prepare updates object
    const updates = {
      avatar: {
        url: imageUrl || avatarImageUrl, // Use the updated URL or the current avatar URL
        alt: "Profile Avatar",
      },
      venueManager: isVenueManager, // Always include the current venueManager status
    };

    try {
      await onUpdateProfile(updates); // Call the parent function to update profile
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage(""); // Clear error message if successful
    } catch (error) {
      setErrorMessage(error.message || "Error updating profile.");
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="formContainer">
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
        </div>
        <br></br>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isVenueManager}
              onChange={handleVenueManagerCheckboxChange}
              disabled={venueManager}
            />
            I want to be a venue manager
          </label>
          {venueManager && (
            <p>
              <b>You are already a venue manager.</b>
            </p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Save
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UpdateProfile;
