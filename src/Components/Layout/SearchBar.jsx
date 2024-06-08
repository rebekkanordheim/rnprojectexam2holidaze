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

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="searchbar"
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
