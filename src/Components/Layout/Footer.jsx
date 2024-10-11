import React from "react";
import "./App.css";
import styles from "../../Button.module.css";
import { isAuthenticated } from "../User/authUtils";
import { Link } from "react-router-dom";

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

  return (
    <footer className="footer">
      <p>&copy; Rebekka Nordheim 2024</p>
      <div>
        {/* Show buttons for creating a new venue and logging out if the user is logged in */}
        {loggedIn && (
          <>
            <Link
              to="/newvenue"
              className={styles.button}
              aria-label="Create a new venue">
              Create New Venue
            </Link>
            <button onClick={handleLogout} className={styles.button} aria-label="Logout">
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;
