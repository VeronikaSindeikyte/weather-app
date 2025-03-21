import React, { useState, useEffect, useRef } from 'react'

const DropdownMenu = ({ onSearch, fetchSelectedCity, selectedCity, setSelectedCity }) => {
    const [cities, setCities] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [showCityDropdown, setShowCityDropdown] = useState(false)
    const [dropdownFilter, setDropdownFilter] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const cityDropdownRef = useRef(null)

    useEffect(() => {
        fetchCities();
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (dropdownFilter.trim() === '') {
            setFilteredCities(cities)
        } else {
            const filtered = cities.filter(cityItem => {
                return cityItem.toLowerCase().startsWith(dropdownFilter.toLowerCase())
            })
            setFilteredCities(filtered)
        }
    }, [dropdownFilter, cities])

    const handleClickOutside = (event) => {
        if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
            setShowCityDropdown(false)
        }
    };

    const fetchCities = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3000/cities')
            
            if (!response.ok) {
                throw new Error('No cities found.')
            }
            
            const data = await response.json()
            setCities(data)
            setFilteredCities(data)
            setError(null)
        } catch (error) {
            console.error('Error fetching cities:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDropdownToggle = () => {
        setShowCityDropdown(!showCityDropdown)
        setDropdownFilter('')
        if (!showCityDropdown) {
            setTimeout(() => {
                if (cityDropdownRef.current) {
                    cityDropdownRef.current.focus()
                }
            }, 100)
        }
    };

    const handleDropdownKeyPress = (e) => {
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            setDropdownFilter(prev => prev + e.key)
        } else if (e.key === 'Backspace') {
            setDropdownFilter(prev => prev.slice(0, -1))
        } else if (e.key === 'Escape') {
            setShowCityDropdown(false)
            setDropdownFilter('')
        }
    };

    const handleDropdownSelect = (cityItem) => {
        setSelectedCity(cityItem)
        onSearch(cityItem)
        fetchSelectedCity(cityItem)
        setShowCityDropdown(false)
        setDropdownFilter('')
    };

    return (
        <div className="d-flex align-items-center justify-content-center p-3">
            <div className="dropdown me-3 position-relative select-city-btns">
                <button
                    className="btn btn-primary dropdown-toggle text-primary-emphasis dropdown-menu-btn"
                    type="button"
                    onClick={handleDropdownToggle}
                >
                    {selectedCity || 'Select City'}
                </button>


                {showCityDropdown && (
                    <div
                        ref={cityDropdownRef}
                        className="dropdown-menu show"
                        style={{ width: '250px' }}
                        tabIndex="0"
                        onKeyDown={handleDropdownKeyPress}
                    >
                        {dropdownFilter && (
                            <div className="px-3 py-2 bg-light">
                                <small>Filter: "{dropdownFilter}"</small>
                                <button
                                    className="btn btn-sm btn-link p-0 float-end"
                                    onClick={() => setDropdownFilter('')}
                                    
                                >
                                    Clear
                                </button>
                            </div>
                        )}

                        {loading ? (
                            <li><span className="dropdown-item">Loading...</span></li>
                        ) : error ? (
                            <li><span className="dropdown-item text-danger">{error}</span></li>
                        ) : filteredCities.length === 0 ? (
                            <li><span className="dropdown-item">No matching cities</span></li>
                        ) : (
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {filteredCities.map((cityItem, index) => (
                                    <button
                                        key={index}
                                        className={`dropdown-item ${cityItem === selectedCity ? 'active' : ''}`}
                                        onClick={() => handleDropdownSelect(cityItem)}
                                    >
                                        {cityItem}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownMenu;