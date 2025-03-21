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
  const currentTime = new Date();

  const getDayPeriod = (hour) => {
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

  // FOr each day, I created an object with the date, weekday, and forecasts for each time period
  const processedData = {};

  for (let forecast of data.forecastTimestamps) {
    const date = new Date(forecast.forecastTimeUtc);
    const day = date.toISOString().split("T")[0];
    const hour = date.getUTCHours();
    const timePeriod = getDayPeriod(hour);
    const timestamp = date.getTime();

    if (!processedData[day]) {
      processedData[day] = {
        date: day,
        weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
        forecasts: {
          Morning: { temps: [], relHumidity: [], windSpeeds: [], conditionCodes: {} },
          Day: { temps: [], relHumidity: [], windSpeeds: [], conditionCodes: {} },
          Evening: { temps: [], relHumidity: [], windSpeeds: [], conditionCodes: {} },
          Night: { temps: [], relHumidity: [], windSpeeds: [], conditionCodes: {} }
        },
        forecastsByTime: [],
      };
    }

    processedData[day].forecastsByTime.push({
      timestamp,
      temperature: forecast.airTemperature,
      conditionCode: forecast.conditionCode,
      relativeHumidity: forecast.relativeHumidity,
      windSpeed: forecast.windSpeed,
    });

    // For adding data to the day time period arrays
    processedData[day].forecasts[timePeriod].temps.push(forecast.airTemperature);
    processedData[day].forecasts[timePeriod].relHumidity.push(forecast.relativeHumidity);
    processedData[day].forecasts[timePeriod].windSpeeds.push(forecast.windSpeed);

    // For counting the number of times a weather condition appears
    if (!processedData[day].forecasts[timePeriod].conditionCodes[forecast.conditionCode]) {
      processedData[day].forecasts[timePeriod].conditionCodes[forecast.conditionCode] = 0;
    }
    processedData[day].forecasts[timePeriod].conditionCodes[forecast.conditionCode]++;
  }

  // For each day, I calculated the average temperature, relative humidity, and wind speed
  Object.values(processedData).forEach(day => {
    if (day.forecastsByTime.length > 0) {
      day.forecastsByTime.sort((a, b) => {
        return Math.abs(a.timestamp - currentTime) - Math.abs(b.timestamp - currentTime);
      });
      day.currentForecast = day.forecastsByTime[0];
    }


    Object.keys(day.forecasts).forEach(period => {
      const periodData = day.forecasts[period];

      if (periodData.temps.length > 0) {
        const avgTemp = periodData.temps.reduce((sum, temp) => sum + temp, 0) / periodData.temps.length;
        periodData.temperature = Math.round(avgTemp);

        periodData.relativeHumidity = Math.round(
          periodData.relHumidity.reduce((sum, hum) => sum + hum, 0) / periodData.relHumidity.length
        );
        periodData.windSpeed = Math.round(
          periodData.windSpeeds.reduce((sum, speed) => sum + speed, 0) / periodData.windSpeeds.length
        );

        let maxCount = 0;
        let mostCommonCode = "clear";
        Object.entries(periodData.conditionCodes).forEach(([code, count]) => {
          if (count > maxCount) {
            maxCount = count;
            mostCommonCode = code;
          }
        });
        periodData.conditionCode = mostCommonCode;
      }

      delete periodData.temps;
      delete periodData.relHumidity;
      delete periodData.windSpeeds;
    });
  });

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
                    {day.currentForecast ? Math.round(day.currentForecast.temperature) : "N/A"} °C
                  </h4>
                </div>

                <div className="d-flex justify-content-center my-3">
                  <Lottie
                    animationData={
                      day.currentForecast
                        ? conditionAnimations[day.currentForecast.conditionCode] || clearAnimation
                        : clearAnimation
                    }
                    style={{ width: 100, height: 100 }}
                    loop={true}
                  />
                </div>

                <p className="card-text">
                  {day.currentForecast ? day.currentForecast.conditionCode : "N/A"}
                </p>
                <div className=" text-primary-emphasis wind-humidity">
                  <p className="card-text">
                    Humidity: {day.currentForecast ? day.currentForecast.relativeHumidity : "N/A"}%
                  </p>
                  <p className="card-text">
                    Wind Speed: {day.currentForecast ? day.currentForecast.windSpeed : "N/A"} m/s
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                  {Object.entries(day.forecasts).map(([period, forecast], idx) => (
                    <div key={idx} className="text-center">
                      <strong>{period}</strong>
                      <p className="text-primary">
                        {forecast.temperature !== undefined ? forecast.temperature : "N/A"}°C
                      </p>
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