import React, { useState, useEffect } from "react";

function UserMadeVenues({ userName }) {
  const [userVenues, setUserVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null); // State for editing venue

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
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVenues();
  }, [userName]);

  const handleEditVenue = (venue) => {
    setEditingVenue(venue); // Set the venue being edited
  };

  const handleUpdateVenue = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    const apiKey = localStorage.getItem("apiKey");

    const updatedVenue = {
      name: e.target.name.value,
      description: e.target.description.value,
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${editingVenue.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVenue),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update venue");
      }

      const updatedData = await response.json();
      setUserVenues((prevVenues) =>
        prevVenues.map((venue) =>
          venue.id === updatedData.data.id ? updatedData.data : venue
        )
      );
      setEditingVenue(null);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteVenue = async (venueId) => {
  };

  if (isLoading) {
    return <div>Loading user venues...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="user-venues">
      {userVenues.length === 0 ? (
        <p>You have no created venues.</p>
      ) : (
        <ul>
          {userVenues.map((venue) => (
            <div className="specific-user-venues" key={venue.id}>
              <h3>{venue.name}</h3>
              <p>Description: {venue.description}</p>
              {/* Display other venue details */}
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
      {editingVenue && (
        <form id="edit-venue-form" onSubmit={handleUpdateVenue}>
          <h3>Edit Venue</h3>
          <input
            className="form-input"
            type="text"
            name="name"
            defaultValue={editingVenue.name}
            placeholder="Venue Name"
            required
          />
          <textarea
            className="form-input"
            name="description"
            placeholder="Description"
            defaultValue={editingVenue.description}
            required
          />
          {/* Add other input fields for media, price, maxGuests, etc. */}
          <button type="submit" className="btn btn-dark">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditingVenue(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UserMadeVenues;
