import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Logo from "../../images/Holidaze-transparent.png";
import { isLoggedIn } from "../User/authUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

/**
 * Header component displaying the navigation bar.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
function Header() {
  const loggedIn = isLoggedIn();

  return (
    <nav className="nav">
      <div>
        <Link to="/">
          <img src={Logo} className="logo" alt="Logo" />
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Venues</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!loggedIn && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {loggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/booking-cart">
                  <FontAwesomeIcon icon={faCartShopping} />{" "}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
