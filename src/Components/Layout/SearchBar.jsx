import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className='searchbar-container' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
        className='searchbar'
      />
      <button className='search-btn' type='submit'>Search</button>
    </form>
  );
}

export default SearchBar;