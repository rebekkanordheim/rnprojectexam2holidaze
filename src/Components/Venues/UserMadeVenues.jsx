import React, { useState, useEffect } from "react";
import styles from "../../Button.module.css";

function UserMadeVenues({ userName }) {
  const [userVenues, setUserVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null);

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
    setSuccessMessage(null); // Clear success message on edit start
  };

  const handleUpdateVenue = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    const apiKey = localStorage.getItem("apiKey");

    const updatedTitle = e.target.name.value;

    try {
      // Fetch the current venue data to preserve all other fields
      const venueResponse = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${editingVenue.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

      if (!venueResponse.ok) {
        throw new Error("Failed to fetch venue data");
      }

      const venueData = await venueResponse.json();

      // Update only the title
      const updatedVenue = {
        ...venueData.data, // Keep all existing data
        name: updatedTitle, // Update only the name
      };

      // Send the updated data back to the API
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
        throw new Error("Failed to update venue title");
      }

      const updatedData = await response.json();

      // Update the local state with the new title
      setUserVenues((prevVenues) =>
        prevVenues.map((venue) =>
          venue.id === updatedData.data.id ? updatedData.data : venue
        )
      );

      setEditingVenue(null); // Close the edit form after successful update
      setSuccessMessage("Changes saved successfully!"); // Set success message

      // Automatically hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteVenue = async (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) {
      return;
    }

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const apiKey = localStorage.getItem("apiKey");

      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }

      setUserVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
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
      <h2>Your Venues</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}{" "}
      {/* Display success message */}
      {userVenues.length === 0 ? (
        <p>You have not created any venues yet.</p>
      ) : (
        <ul>
          {userVenues.map((venue) => (
            <div className="venue" key={venue.id}>
              <div className="venue-info">
                <img
                  src={venue.media?.[0]?.url || "https://via.placeholder.com/150"}
                  alt={venue.media?.[0]?.alt || "Venue Image"}
                  className="venue-image"
                />
                <h3 className="venue-title">{venue.name}</h3>
              </div>
              <button onClick={() => handleEditVenue(venue)} className={styles.button}>
                Edit Venue
              </button>
              <button
                onClick={() => handleDeleteVenue(venue.id)}
                className={styles.buttondanger}>
                Delete Venue
              </button>

              {/* Only show the edit form if this is the venue being edited */}
              {editingVenue && editingVenue.id === venue.id && (
                <form
                  id="edit-venue-form"
                  onSubmit={handleUpdateVenue}
                  className="specific-booking">
                  <h3>Edit Venue:</h3>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    defaultValue={editingVenue.name}
                    placeholder="Venue Name"
                    required
                  />
                  <br />
                  <button type="submit" className={styles.button}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => setEditingVenue(null)}>
                    {" "}
                    {/* Close the edit form */}
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserMadeVenues;