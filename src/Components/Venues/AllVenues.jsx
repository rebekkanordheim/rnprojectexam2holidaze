import React, { useEffect, useState } from "react";
import SearchBar from "../Layout/SearchBar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { VENUES_API_ENDPOINT } from "../../Common/constants";
import styles from "../../Button.module.css";

/**
 * Venues component displaying a list of venues fetched from an API.
 *
 * @returns {JSX.Element} JSX element representing the Venues component.
 */
function Venues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    /**
     * Fetches venues data from the API.
     */
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${VENUES_API_ENDPOINT}?sort=created`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setVenues(data.data);
        setFilteredVenues(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, []);

  /**
   * Handles search functionality to filter venues by name.
   *
   * @param {string} searchTerm - The search term entered by the user.
   */
  const handleSearch = (searchTerm) => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  return (
    <div>
      <Helmet>
        <title>Holidaze | Home</title>
      </Helmet>
      <SearchBar onSearch={handleSearch} />
      <div className="venues-container">
        {isLoading && <div className="loading-message">Loading venues...</div>}
        {isError && <div className="error-message">Error loading venues</div>}
        {!isLoading && !isError && (
          <>
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <div key={venue.id} className="venue">
                  <div className="venue-info">
                    <Link to={`/venue/${venue.id}`}>
                      <h2 className="venue-title">{venue.name}</h2>
                    </Link>
                    <p className="venue-description">
                      Price: ${venue.price} | Max Guests: {venue.maxGuests}
                    </p>
                    {venue.media.length > 0 && (
                      <img
                        className="venue-image"
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                      />
                    )}
                    <Link to={`/venue/${venue.id}`}>
                      <button type="submit" className={styles.button}>
                        View Venue
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="error-message">No venues found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Venues;
