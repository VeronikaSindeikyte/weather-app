import React, { useState } from 'react'


function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="d-flex search">
      <input
        type="text"
        className="form-control me-sm-2 search-bar"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button
        className='btn btn-secondary my-2 my-sm-0'
        onClick={handleSearch}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"></path><path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  );
}

export default SearchBar