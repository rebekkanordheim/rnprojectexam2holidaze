import React, { useState } from "react";
import styles from "../../../Button.module.css";

function UpdateVenueManager({ venueManager, onUpdateVenueManager }) {
  const [isVenueManager, setIsVenueManager] = useState(venueManager);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVenueManagerCheckboxChange = (e) => {
    setIsVenueManager(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isVenueManager === venueManager) {
      setErrorMessage("No changes made.");
      setSuccessMessage("");
      return;
    }

    try {
      await onUpdateVenueManager(isVenueManager);
      setSuccessMessage("Venue Manager status updated successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Error updating venue manager status.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="venueManagerForm">
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
          <p className="info-text">
            <b>You are already a venue manager.</b> This option cannot be changed.
          </p>
        )}
        <button className={styles.button} type="submit">
          Save Venue Manager Status
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UpdateVenueManager;