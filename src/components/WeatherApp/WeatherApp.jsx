import React, { useState, useEffect } from 'react';
import SearchBar from '../searchTools/SearchBar/SearchBar';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import DropdownMenu from '../searchTools/DropdownMenu/DropdownMenu';
import ThreeCitiesSelect from '../searchTools/ThreeCitiesSelect/ThreeCitiesSelect';
import './WeatherApp.styles.scss';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [mostSearchedCities, setMostSearchedCities] = useState([]);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      setSelectedCity(city);
      const response = await fetch(`http://localhost:3000/weather/${city}`);

      if (!response.ok) {
        throw new Error('No weather found.');
      }

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedCity = async (city) => {
    setLoading(true);
    try {
      setSelectedCity(city);

      const response = await fetch('http://localhost:3000/api/log-city-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        throw new Error('No weather found.');
      }

      const data = await response.json();
      console.log('City selection logged:', data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error logging city selection:', error);
      setLoading(false);
      throw error;
    }
  };

  const handleCitySelection = async (city) => {
    try {
      storeCitySearch(city);
      await fetchSelectedCity(city);
      await fetchWeather(city);
    } catch (error) {
      console.error('Error handling city selection:', error);
    }
  };

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("searchedCities")) || {};
    updateMostSearchedCities(storedCities);
  }, []);

  const updateMostSearchedCities = (storedCities) => {
    const sortedCities = Object.entries(storedCities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([city]) => city);

    setMostSearchedCities(sortedCities);
  };

  const storeCitySearch = (city) => {
    const storedCities = JSON.parse(localStorage.getItem("searchedCities")) || {};
    storedCities[city] = (storedCities[city] || 0) + 1;

    localStorage.setItem("searchedCities", JSON.stringify(storedCities));
    updateMostSearchedCities(storedCities);
  };

  return (
    <div className="card mb-3 p-3 text-center weather-app">
      <div className='d-flex justify-content-center align-items-center header'>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-thermometer-snow" viewBox="0 0 16 16">
          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5" />
          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5" />
        </svg>
        <h1 className="m-2 mt-4 text-primary-emphasis">Weather App</h1>
      </div>
      <h3 className="m-4">Please enter your city to see the forecast:</h3>
      <div className="d-flex justify-content-center mb-4 search-tools">
        <SearchBar
          onSearch={handleCitySelection}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      <div className="d-flex justify-content-center mb-4 search-tools">
        <DropdownMenu
          onSearch={handleCitySelection}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <ThreeCitiesSelect
          onSearch={handleCitySelection}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>

      {mostSearchedCities.length > 0 && (
        <div className="most-searched mt-3">
          <h5>Your Most Searched Cities:</h5>
          <div className="d-flex justify-content-center text-center">
            {mostSearchedCities.map((city, index) => (
              <button
                key={index}
                className="btn btn-outline-primary mx-2"
                onClick={() => handleCitySelection(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="m-3 text-secondary-emphasis loading">
          Loading weather forecast...
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: '75%' }}
            >
            </div>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}

      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}

export default WeatherApp;
