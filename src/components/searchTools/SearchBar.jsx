import React, { useState, useEffect, useRef } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [searchFilteredCities, setSearchFilteredCities] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const searchDropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    fetchCities();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (city.trim() === '') {
      setSearchFilteredCities([]);
      setShowSearchDropdown(false);
    } else {
      const filtered = cities.filter(cityItem => {
        return cityItem.toLowerCase().startsWith(city.toLowerCase());
      });
      setSearchFilteredCities(filtered);
      setShowSearchDropdown(true);
    }
    
    setActiveIndex(-1);
  }, [city, cities]);

  const handleClickOutside = (event) => {
    if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSearchDropdown(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setShowSearchDropdown(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < searchFilteredCities.length) {
        const selectedCity = searchFilteredCities[activeIndex];
        setCity(selectedCity);
        onSearch(selectedCity);
      } else {
        handleSearch();
      }
      setShowSearchDropdown(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < searchFilteredCities.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Escape') {
      setShowSearchDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleDropdownSelect = (selectedCity) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setShowSearchDropdown(false);
  };

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/cities');
      
      if (!response.ok) {
        throw new Error('No cities found.');
      }
      
      const data = await response.json();
      setCities(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex search position-relative">
        <input
          ref={inputRef}
          type="text"
          className="form-control me-sm-2 search-bar"
          placeholder="Search for a city..."
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          autoComplete="off"
        />
        <button className="btn btn-secondary my-2 my-sm-0" onClick={handleSearch}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        
        {showSearchDropdown && city.trim() !== '' && (
          <div 
            ref={searchDropdownRef}
            className="dropdown-menu show w-100 position-absolute" 
            style={{ top: '100%', left: 0 }}
          >
            {loading ? (
              <li><span className="dropdown-item">Loading...</span></li>
            ) : error ? (
              <li><span className="dropdown-item text-danger">{error}</span></li>
            ) : searchFilteredCities.length === 0 ? (
              <li><span className="dropdown-item">No matching cities</span></li>
            ) : (
              searchFilteredCities.map((cityItem, index) => (
                <button 
                  key={index}
                  className={`dropdown-item ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleDropdownSelect(cityItem)}
                >
                  {cityItem}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;