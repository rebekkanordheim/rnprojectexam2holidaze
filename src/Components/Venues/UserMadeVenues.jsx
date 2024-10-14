import React, { useState, useEffect } from "react";

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

        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}/venues`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );

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

  const handleEditVenue = (venue) => {
    // Implement edit functionality here
  };

  const handleDeleteVenue = async (venueId) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const apiKey = localStorage.getItem("apiKey");

    const deleteUrl = `https://v2.api.noroff.dev/holidaze/venues/${venueId}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }

      // Update the state to remove the deleted venue
      setUserVenues((prevVenues) => {
        const updatedVenues = prevVenues.filter((venue) => venue.id !== venueId);
        return updatedVenues.length > 0 ? updatedVenues : []; // Return an empty array if no venues left
      });
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) {
    return <div>Loading user venues...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="user-venues">
      <h2>Your Created Venues</h2>
      {userVenues.length === 0 ? (
        <p>You have no created venues.</p>
      ) : (
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
              <button
                onClick={() => handleEditVenue(venue)}
                className="edit-venue-btn btn btn-dark">
                Edit Venue
              </button>
              <button
                onClick={() => handleDeleteVenue(venue.id)}
                className="delete-venue-btn btn btn-danger">
                Delete Venue
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserMadeVenues;
