import React from "react";
import Venues from "../Venues/AllVenues";

/**
 * Home component that serves as the main landing page.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
function Home() {
  return (
    <div>
      <h1>Welcome to Holidaze!</h1>
      <Venues />
    </div>
  );
}

export default Home;
