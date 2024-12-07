import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Logo from "../../images/Holidaze-transparent.png";
import { isAuthenticated } from "../User/authUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

/**
 * Component representing the header navigation bar.
 * The header includes the logo and navigation links, with conditional rendering
 * based on the user's authentication status. If the user is logged in,
 * a link to the user's profile is displayed.
 *
 * @returns {JSX.Element} JSX element representing the Header component.
 */
function Header() {
  const loggedIn = isAuthenticated();

  return (
    <header>
      <nav className="nav">
        <div>
          <Link to="/" aria-label="Go to Home">
            <img src={Logo} className="logo" alt="Holidaze Logo" />
          </Link>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/" aria-label="View Venues">
                Venues
              </Link>
            </li>
            <li>
              <Link to="/contact" aria-label="Contact Us">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" aria-label="Learn About Us">
                About
              </Link>
            </li>
            {!loggedIn && (
              <>
                <li>
                  <Link to="/register" aria-label="Register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" aria-label="Login">
                    Login
                  </Link>
                </li>
              </>
            )}
            {loggedIn && (
              <>
                <li>
                  <Link
                    to="/profile"
                    aria-label="View Profile"
                    style={{ marginLeft: "15px" }}>
                    <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
