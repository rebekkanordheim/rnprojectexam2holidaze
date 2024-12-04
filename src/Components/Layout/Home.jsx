import React from "react";
import Venues from "../Venues/AllVenues";
import "./App.css"; // Ensure this is included to apply styles

/**
 * Home component that serves as the main landing page.
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
