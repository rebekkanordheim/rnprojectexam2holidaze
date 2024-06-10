import React from "react";
import "./App.css";
import styles from "../../Button.module.css";
import { isAuthenticated } from "../User/authUtils";

/**
 * Clears the local storage and redirects to the home page.
 */
const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

/**
 * Renders the Footer component.
 * This component displays the footer with a copyright notice and conditional buttons.
 * If the user is logged in, it shows buttons for creating a new venue and logging out.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
function Footer() {
  const loggedIn = isAuthenticated();

  /**
   * Redirects to the new venue creation page.
   */
  const handleNewVenueClick = () => {
    window.location.href = "/newvenue";
  };

  return (
    <footer className="footer">
      <p>&copy; Rebekka Nordheim 2024</p>
      <div>
        {/* Renders the "Create New Venue" button if the user is logged in */}
        {loggedIn && (
          <button onClick={handleNewVenueClick} className={styles.button}>
            Create New Venue
          </button>
        )}
        {/* Renders the "Logout" button if the user is logged in */}
        {loggedIn && (
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
