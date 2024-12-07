import React from "react";
import "./App.css";
import styles from "../../Button.module.css";
import { isAuthenticated } from "../User/authUtils";
import { Link } from "react-router-dom";

/**
 * Clears the local storage and redirects the user to the home page.
 * This function is typically used when the user logs out, ensuring that all stored data is cleared.
 */
const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

/**
 * Renders the Footer component.
 *
 * The Footer displays a copyright notice and conditionally renders buttons
 * based on the user's authentication status. If the user is logged in,
 * it provides options to create a new venue and log out.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component with conditional content.
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
            <Link to="/newvenue" className="link" aria-label="Create venue">
              Create Venue
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
