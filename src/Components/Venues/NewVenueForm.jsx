import React, { useState, useEffect } from "react";
import styles from "../../Button.module.css";
import { VENUES_API_ENDPOINT, USER_API_UPDATE } from "../../Common/constants";
import { isAuthenticated } from "../User/authUtils";

/**
 * NewVenueForm component allows the user to create a new venue with various details.
 * It includes form validation and ensures the user is authenticated and has venue manager privileges.
 *
 * @component
 * @returns {JSX.Element} JSX element representing the NewVenueForm component.
 */
function NewVenueForm() {
  /** State for venue name input. */
  const [name, setName] = useState("");

  /** State for venue description input. */
  const [description, setDescription] = useState("");

  /** State for venue image URL input. */
  const [imageUrl, setImageUrl] = useState("");

  /** State for venue price input. */
  const [price, setPrice] = useState("");

  /** State for maximum guests input. */
  const [maxGuests, setMaxGuests] = useState("");

  /** State for wifi option (default: true). */
  const [wifi, setWifi] = useState(true);

  /** State for parking option (default: true). */
  const [parking, setParking] = useState(true);

  /** State for breakfast option (default: true). */
  const [breakfast, setBreakfast] = useState(true);

  /** State for pets option (default: true). */
  const [pets, setPets] = useState(true);

  /** State for address input. */
  const [address, setAddress] = useState("");

  /** State for city input. */
  const [city, setCity] = useState("");

  /** State for zip code input. */
  const [zip, setZip] = useState("");

  /** State for country input. */
  const [country, setCountry] = useState("");

  /** State for success message display. */
  const [successMessage, setSuccessMessage] = useState("");

  /** State for error message display. */
  const [errorMessage, setErrorMessage] = useState("");

  /** State for checking if the user is a venue manager. */
  const [venueManager, setVenueManager] = useState(false);

  useEffect(() => {
    /**
     * Fetches the current user's profile data to check if they are a venue manager.
     *
     * @async
     * @returns {Promise<void>} Resolves after fetching the user profile and updating state.
     */
    if (isAuthenticated()) {
      const fetchProfile = async () => {
        const userName = localStorage.getItem("userName");
        const jwtToken = localStorage.getItem("jwtToken");
        const apiKey = localStorage.getItem("apiKey");

        try {
          const response = await fetch(`${USER_API_UPDATE}/${userName}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setVenueManager(data.data.venueManager);
          } else {
            throw new Error("Failed to fetch user profile");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchProfile();
    }
  }, []);

  /**
   * Handles the form submission to create a new venue.
   * Validates the user and venue manager status before making the API request.
   *
   * @param {Event} event - The form submit event.
   * @returns {Promise<void>} Resolves after creating the venue and updating the user profile.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated()) {
      setErrorMessage("User not authenticated");
      return;
    }

    if (!venueManager) {
      setErrorMessage("You must be a venue manager to create a venue.");
      return;
    }

    const jwtToken = localStorage.getItem("jwtToken");
    const apiKey = localStorage.getItem("apiKey");

    const venueData = {
      name,
      description,
      media: imageUrl ? [{ url: imageUrl, alt: "Venue Image" }] : [],
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests),
      rating: 0,
      meta: {
        wifi,
        parking,
        breakfast,
        pets,
      },
      location: {
        address,
        city,
        zip,
        country,
      },
    };

    try {
      const response = await fetch(VENUES_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(venueData),
      });

      if (!response.ok) {
        throw new Error("Failed to create venue");
      }

      const responseData = await response.json();
      console.log("Venue created:", responseData);

      // Update the user profile with the new venue ID
      const venueId = responseData.data.id;
      const userName = localStorage.getItem("userName");

      const updateUserResponse = await fetch(`${USER_API_UPDATE}/${userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({ newVenueId: venueId }),
      });

      if (!updateUserResponse.ok) {
        throw new Error("Failed to update user profile with new venue ID");
      }

      setSuccessMessage("Venue created successfully");
      setErrorMessage("");

      // Redirect to home after 2 seconds
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home page
      }, 2000);
    } catch (error) {
      console.error("Error creating venue:", error);
      setErrorMessage("Failed to create venue. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Create a New Venue</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          id="description"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-textarea"
        />
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          placeholder="Image URL"
          onChange={(e) => setImageUrl(e.target.value)}
          className="form-input"
        />
        <input
          type="number"
          id="price"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="form-input"
        />
        <input
          type="number"
          id="maxGuests"
          value={maxGuests}
          placeholder="Max Guests"
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          min="1"
          className="form-input"
        />
        <div>
          <label>Wifi</label>
          <div>
            <input
              type="checkbox"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
            />{" "}
            Wifi
          </div>
        </div>
        <div>
          <label>Parking</label>
          <div>
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
            />{" "}
            Parking
          </div>
        </div>
        <div>
          <label>Breakfast</label>
          <div>
            <input
              type="checkbox"
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
            />{" "}
            Breakfast
          </div>
        </div>
        <div>
          <label>Pets</label>
          <div>
            <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
            />{" "}
            Pets
          </div>
        </div>
        <input
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          id="city"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          id="zip"
          value={zip}
          placeholder="Zip"
          onChange={(e) => setZip(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          id="country"
          value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          className="form-input"
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewVenueForm;
