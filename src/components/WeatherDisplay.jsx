import React from "react"

function WeatherDisplay({ data }) {
  const { name: areaName, country: countryName } = data.place

  // pataisyti cia, nes rodo ne kiekvienos dienos orus, o kas valanda kai keiciasi

  const dailyForecast = []
  const seenDates = new Set()

  for (let forecast of data.forecastTimestamps) {
    const date = new Date(forecast.forecastTimeUtc)
    const day = date.toISOString().split("T")[0]

    if (!seenDates.has(day)) {
      seenDates.add(day)
      dailyForecast.push(forecast)
    }

    if (dailyForecast.length === 5) break
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">5-Day Weather Forecast for {areaName}, {countryName}</h2>
      <div className="row">
        {dailyForecast.map((forecast, index) => {
          const date = new Date(forecast.forecastTimeUtc)
          const weekday = date.toLocaleDateString("en-US", { weekday: "long" })

          return (
            <div key={index} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body text-center">
                  <h5 className="card-title">{weekday}</h5>
                  <p className="card-text temp">{forecast.airTemperature}°C</p>
                  <p className="card-text condition">{forecast.conditionCode}</p>
                  <p className="card-text humidity">Humidity: {forecast.relativeHumidity}%</p>
                  <p className="card-text wind">Wind speed: {forecast.windSpeed} m/s</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherDisplay