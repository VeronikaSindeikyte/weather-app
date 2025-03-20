import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog, FaCloudSun, FaCloudSunRain } from "react-icons/fa";

function WeatherDisplay({ data }) {
  const { name: areaName, country: countryName } = data.place;

  const getTimePeriod = (hour) => {
    if (hour >= 5 && hour < 11) return "MORNING\n05:00 am - 11:00 am";
    if (hour >= 11 && hour < 17) return "DAY\n11:00 am - 05:00 pm";
    if (hour >= 17 && hour < 23) return "EVENING\n05:00 pm - 11:00 pm";
    return "NIGHT\n11:00 pm - 05:00 am";
  };

  const conditionIcons = {
    clear: <FaSun size={30} color="goldenrod" />, 
    cloudy: <FaCloud size={30} color="gray" />, 
    rain: <FaCloudRain size={30} color="blue" />, 
    snow: <FaSnowflake size={30} color="lightblue" />, 
    fog: <FaSmog size={30} color="darkgray" />,
    "partly-cloudy": <FaCloudSun size={30} color="orange" />,
    "cloudy-with-sunny-intervals": <FaCloudSunRain size={30} color="lightgray" />,
    // "light-rain": <FaRain size={30} color="lightgray" />
  };

  const processedData = {};
  
  for (let forecast of data.forecastTimestamps) {
    console.log("Weather condition logged:", forecast.conditionCode);
    const date = new Date(forecast.forecastTimeUtc);
    const day = date.toISOString().split("T")[0];
    const hour = date.getUTCHours();
    const timePeriod = getTimePeriod(hour);
    
    if (!processedData[day]) {
      processedData[day] = {
        date: day,
        weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
        forecasts: {}
      };
    }
    
    if (!processedData[day].forecasts[timePeriod]) {
      processedData[day].forecasts[timePeriod] = {
        readings: [],
        avgTemperature: 0,
        conditionCode: "",
        relativeHumidity: 0,
        windSpeed: 0
      };
    }
    
    processedData[day].forecasts[timePeriod].readings.push(forecast);
  }

  for (const day in processedData) {
    for (const timePeriod in processedData[day].forecasts) {
      const forecasts = processedData[day].forecasts[timePeriod].readings;
      const count = forecasts.length;
      
      if (count > 0) {
        const sumTemp = forecasts.reduce((sum, f) => sum + f.airTemperature, 0);
        processedData[day].forecasts[timePeriod].avgTemperature = (sumTemp / count).toFixed(1);
        
        const sumHumidity = forecasts.reduce((sum, f) => sum + f.relativeHumidity, 0);
        processedData[day].forecasts[timePeriod].relativeHumidity = Math.round(sumHumidity / count);
        
        const sumWind = forecasts.reduce((sum, f) => sum + f.windSpeed, 0);
        processedData[day].forecasts[timePeriod].windSpeed = (sumWind / count).toFixed(1);
        
        const conditionCounts = {};
        forecasts.forEach(f => {
          conditionCounts[f.conditionCode] = (conditionCounts[f.conditionCode] || 0) + 1;
        });
        
        let maxCount = 0;
        let mostCommonCondition = forecasts[forecasts.length - 1].conditionCode;
        
        for (const condition in conditionCounts) {
          if (conditionCounts[condition] > maxCount) {
            maxCount = conditionCounts[condition];
            mostCommonCondition = condition;
          }
        }
        
        processedData[day].forecasts[timePeriod].conditionCode = mostCommonCondition;
      }
    }
  }
  
  const fiveDayForecast = Object.values(processedData).slice(0, 5);
  
  const timePeriods = [
    "MORNING\n05:00 am - 11:00 am",
    "DAY\n11:00 am - 05:00 pm",
    "EVENING\n05:00 pm - 11:00 pm",
    "NIGHT\n11:00 pm - 05:00 am"
  ];
  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">5-Day Weather Forecast for {areaName}, {countryName}</h2>
      {fiveDayForecast.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-4">
          <h3 className="text-center mb-3">{day.weekday}</h3>
          <div className="row">
            {timePeriods.map((period, periodIndex) => {
              const periodData = day.forecasts[period];
              return (
                <div key={`${dayIndex}-${periodIndex}`} className="col-md-3 d-flex">
                  <div className="card mb-3 shadow-sm border-primary flex-fill">
                    <div className="card border-light mb-3 card-body text-center">
                      <h5 className="card-title" style={{ whiteSpace: "pre-line" }}>{period}</h5>
                      {periodData && periodData.readings.length > 0 ? (
                        <>
                          <h3 className="card-text text-primary">{periodData.avgTemperature}°C</h3>
                          <p className="card-text">{conditionIcons[periodData.conditionCode] || periodData.conditionCode}</p>
                          <p className="card-text">{periodData.conditionCode}</p>
                          <p className="card-text">Humidity: {periodData.relativeHumidity}%</p>
                          <p className="card-text">Wind speed: {periodData.windSpeed} m/s</p>
                        </>
                      ) : (
                        <p className="card-text">-</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;