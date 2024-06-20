import React, { useState, useEffect } from "react";

const USER_MADE_VENUES = `https://v2.api.noroff.dev/holidaze/profiles/{userName}/venues`;
const VENUE_BOOKINGS_ENDPOINT = `https://v2.api.noroff.dev/holidaze/venues/{venueId}/bookings`;

function UserMadeVenues({ userName }) {
  const [userVenues, setUserVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserVenues = async () => {
      try {
        setIsLoading(true);

        const jwtToken = localStorage.getItem("jwtToken");
        const apiKey = localStorage.getItem("apiKey");

        const response = await fetch(USER_MADE_VENUES.replace("{userName}", userName), {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user venues");
        }

        const data = await response.json();
        setUserVenues(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserVenues();
  }, [userName]);

  if (isLoading) {
    return <div>Loading user venues...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (userVenues.length === 0) {
    return <div>No venues found</div>;
  }

  return (
    <div className="user-venues">
      <h2>Your Created Venues</h2>
      <ul>
        {userVenues.map((venue) => (
          <div className="specific-user-venues" key={venue.id}>
            <h3>{venue.name}</h3>
            <p>Description: {venue.description}</p>
            <p>
              Address: {venue.location.address}, {venue.location.city},{" "}
              {venue.location.country}
            </p>
            <p>Number of Bookings: {venue._count.bookings}</p>
            {/* Additional venue details can be displayed here */}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default UserMadeVenues;
