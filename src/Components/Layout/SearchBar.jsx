import React, { useState } from "react";

/**
 * SearchBar component for entering search terms and triggering search actions.
 *
 * @param {Object} props - The props passed to the component.
 * @param {function} props.onSearch - The function to be called when the user submits the search term.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Handles the change event of the input field and updates the search term state.
   * @param {Object} event - The change event object.
   */
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handles the form submission event and calls the onSearch callback with the current search term.
   * @param {Object} event - The form submission event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  /**
   * Clears the search term state and refreshes the page.
   */
  const handleClear = () => {
    setSearchTerm(""); // Clear the search input
    window.location.reload(); // Refresh the page
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <div className="searchbar-wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          className="searchbar"
        />
        {searchTerm && ( // Only show clear button if there's text in the input
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search">
            X {/* Change from "Clear" to "X" */}
          </button>
        )}
      </div>
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
