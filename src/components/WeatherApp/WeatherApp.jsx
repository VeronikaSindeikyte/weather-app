import React, { useState } from 'react';
import SearchBar from '../searchTools/SearchBar/SearchBar';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import DropdownMenu from '../searchTools/DropdownMenu/DropdownMenu';
import ThreeCitiesSelect from '../searchTools/ThreeCitiesSelect/ThreeCitiesSelect';
import './WeatherApp.styles.scss'

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

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
      await fetchSelectedCity(city);
      await fetchWeather(city);
    } catch (error) {
      console.error('Error handling city selection:', error);
    }
  };

  return (
    <div className="card mb-3 p-3 text-center  weather-app">
      <h1 className="m-4 text-primary-emphasis">Weather App</h1>
      <h3 className="m-4">Please enter your city to see the forecast:</h3>
      <div className="d-flex justify-content-center mb-4">
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

      {loading && <div className="loading">Loading weather forecast...</div>}
      {error && <div className="error">{error}</div>}
      
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}

export default WeatherApp;
