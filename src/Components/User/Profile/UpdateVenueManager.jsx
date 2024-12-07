import React, { useState } from "react";
import styles from "../../../Button.module.css";

/**
 * UpdateVenueManager component allows users to update their venue manager status.
 * It handles the checkbox input to toggle the venue manager status and displays success or error messages.
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.venueManager - Current venue manager status (true if the user is a venue manager).
 * @param {Function} props.onUpdateVenueManager - Function to handle updating the venue manager status.
 */
function UpdateVenueManager({ venueManager, onUpdateVenueManager }) {
  /** State to manage the current venue manager checkbox state. */
  const [isVenueManager, setIsVenueManager] = useState(venueManager);

  /** State to manage the success message after a successful update. */
  const [successMessage, setSuccessMessage] = useState("");

  /** State to manage the error message during the update process. */
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles the change in the venue manager checkbox.
   * @param {Object} e - Event object from the checkbox input.
   */
  const handleVenueManagerCheckboxChange = (e) => {
    setIsVenueManager(e.target.checked);
  };

  /**
   * Handles the form submission, attempts to update the venue manager status,
   * and displays success or error messages.
   * @async
   * @param {Object} e - Event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is already a venue manager or if there's no change
    if (venueManager) {
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
      // Attempt to update the venue manager status
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
