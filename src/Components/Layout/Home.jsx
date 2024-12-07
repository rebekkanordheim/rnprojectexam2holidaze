import React from "react";
import Venues from "../Venues/AllVenues";
import "./App.css"; // Ensure this is included to apply styles

/**
 * Home component that serves as the main landing page.
 * This component displays a welcome message and a brief description of the platform,
 * followed by the Venues component which shows available venues for booking.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
function Home() {
  return (
    <div>
      <header>
        <h1>Welcome to Holidaze!</h1>
        <h2 className="h2-info">
          Your ultimate destination for hassle-free accommodation booking.
        </h2>
      </header>
      <Venues />
    </div>
  );
}

export default Home;
