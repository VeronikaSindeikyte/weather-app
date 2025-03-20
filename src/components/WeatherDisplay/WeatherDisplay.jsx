import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Lottie from "lottie-react";
import clearAnimation from "../../animations/clear.json";
import cloudyAnimation from "../../animations/cloudy.json";
import rainAnimation from "../../animations/rain.json";
import snowAnimation from "../../animations/snow.json";
import fogAnimation from "../../animations/fog.json";
import cloudyWithSunAnimation from "../../animations/cloudy-with-sun.json";
import "./WeatherDisplay.styles.scss";

function WeatherDisplay({ data }) {
  const { name: areaName, country: countryName } = data.place;

  const getTimePeriod = (hour) => {
    if (hour >= 5 && hour < 11) return "Morning";
    if (hour >= 11 && hour < 17) return "Day";
    if (hour >= 17 && hour < 23) return "Evening";
    return "Night";
  };

  const conditionAnimations = {
    clear: clearAnimation,
    cloudy: cloudyAnimation,
    rain: rainAnimation,
    snow: snowAnimation,
    fog: fogAnimation,
    "cloudy-with-sunny-intervals": cloudyWithSunAnimation,
  };

  const processedData = {};

  for (let forecast of data.forecastTimestamps) {
    const date = new Date(forecast.forecastTimeUtc);
    const day = date.toISOString().split("T")[0];
    const hour = date.getUTCHours();
    const timePeriod = getTimePeriod(hour);

    if (!processedData[day]) {
      processedData[day] = {
        date: day,
        weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
        forecasts: {
          Morning: {},
          Day: {},
          Evening: {},
          Night: {},
        },
      };
    }

    processedData[day].forecasts[timePeriod] = {
      temperature: forecast.airTemperature,
      conditionCode: forecast.conditionCode,
      relativeHumidity: forecast.relativeHumidity,
      windSpeed: forecast.windSpeed,
    };
  }

  const fiveDayForecast = Object.values(processedData).slice(0, 5);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3 p-3 text-primary-emphasis">
        5-Day Weather Forecast for {areaName}, {countryName}
      </h2>
      <div className="row">
        {fiveDayForecast.map((day, index) => (
          <div key={index} className="col-md-4 d-flex">
            <div className="card mb-4 shadow-sm border-primary flex-fill text-primary-emphasis">
              <div className="card-body text-center bg-light weather-card">
                <div className="d-flex justify-content-between">
                  <h5 className="text-left date">
                    {day.date} <br />
                    {day.weekday}
                  </h5>
                  <h4 className="text-primary temperature">
                    {day.forecasts.Day.temperature} °C
                  </h4>
                </div>
  
                <div className="d-flex justify-content-center my-3">
                  <Lottie
                    animationData={conditionAnimations[day.forecasts.Day.conditionCode] || clearAnimation}
                    style={{ width: 100, height: 100 }}
                    loop={true}
                  />
                </div>
  
                <p className="card-text">{day.forecasts.Day.conditionCode}</p>
                <p className="card-text">
                  Humidity: {day.forecasts.Day.relativeHumidity}%
                </p>
                <p className="card-text">
                  Wind Speed: {day.forecasts.Day.windSpeed} m/s
                </p>
                <hr />
                <div className="d-flex justify-content-around">
                  {Object.entries(day.forecasts).map(([period, forecast], idx) => (
                    <div key={idx} className="text-center">
                      <strong>{period}</strong>
                      <p className="text-primary">{forecast.temperature}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;