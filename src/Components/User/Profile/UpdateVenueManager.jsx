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

    if (venueManager) {
      // Show error message when user is already a venue manager
      setErrorMessage("No changes made.");
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (isVenueManager === venueManager) {
      setErrorMessage("No changes made.");
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      await onUpdateVenueManager(isVenueManager);
      setSuccessMessage("Venue Manager status updated successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.message || "Error updating venue manager status.");
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
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
        <br />
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
