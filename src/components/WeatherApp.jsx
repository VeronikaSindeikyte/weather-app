import React, { useState } from 'react'
import SearchBar from './SearchBar'
import WeatherDisplay from './WeatherDisplay'


function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/weather/${city}`)
      
      if (!response.ok) {
        throw new Error('No weather found.')
      }
      
      const data = await response.json()
      console.log(data)
      setWeatherData(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching weather:', error)
      setError(error.message)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="card mb-3 weather-app">
      <h1>Weather App</h1>
      <h2>Please enter your city to see the forecast:</h2>
      <SearchBar onSearch={fetchWeather} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}

export default WeatherApp