import React, { useState } from "react";
import styles from "../../../Button.module.css";

function UpdateAvatarUrl({ avatarImageUrl, onUpdateAvatar }) {
  const [imageUrl, setImageUrl] = useState(avatarImageUrl || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrl === avatarImageUrl) {
      setErrorMessage("No changes made.");
      setSuccessMessage("");
      return;
    }

    try {
      await onUpdateAvatar({ url: imageUrl, alt: "Profile Avatar" });
      setSuccessMessage("Avatar updated successfully!");
      setErrorMessage("");
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