import React, { useState } from "react";
import styles from "../../../Button.module.css";

/**
 * UpdateAvatarUrl component allows users to update their profile avatar image URL.
 * It handles the input of a new image URL, submits the update, and displays success or error messages.
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.avatarImageUrl - The current avatar image URL.
 * @param {Function} props.onUpdateAvatar - Function to handle updating the avatar image.
 */
function UpdateAvatarUrl({ avatarImageUrl, onUpdateAvatar }) {
  /** State to manage the new avatar image URL input. */
  const [imageUrl, setImageUrl] = useState(avatarImageUrl || "");

  /** State to manage the success message after a successful avatar update. */
  const [successMessage, setSuccessMessage] = useState("");

  /** State to manage error messages during the update process. */
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles the change in the image URL input field.
   * @param {Object} e - Event object from the input field.
   */
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  /**
   * Handles the form submission, attempts to update the avatar image URL,
   * and displays success or error messages.
   * @async
   * @param {Object} e - Event object from the form submission.
   * @throws {Error} If the avatar update fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the image URL has changed
    if (imageUrl === avatarImageUrl) {
      setErrorMessage("No changes made.");
      setSuccessMessage("");
      return;
    }

    try {
      // Attempt to update the avatar
      await onUpdateAvatar({ url: imageUrl, alt: "Profile Avatar" });
      setSuccessMessage("Avatar updated successfully!");
      setErrorMessage("");

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000); // 2000ms = 2 seconds

      // Clear the input field after a successful update
      setImageUrl(""); // Clear the input field
    } catch (error) {
      setErrorMessage(error.message || "Error updating avatar.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="avatarform">
        <label htmlFor="imageUrl">Image URL:</label>
        <br />
        <input
          className="avatarUrl"
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Enter a valid image URL"
        />
        <br />
        <button className={styles.button} type="submit">
          Save image
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UpdateAvatarUrl;
