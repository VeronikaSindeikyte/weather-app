# Weather App

A weather forecast application that provides 5-day weather forecasts for cities in Lithuania using the [api.meteo.lt](https://api.meteo.lt/) API. This application features multiple search tools, user interaction tracking, and detailed weather insights with animated visualizations.

## Table of Contents
- [Features](#features)
- [Technologies Used ](#Technologies-Used)
- [Installation](#installation)
- [Usage](#usage)
- [Key Endpoints Used](#Key-Endpoints-Used)
- [Search Functionality](#search-functionality)
- [Weather Display](#weather-display)
- [Backend Functionality](#backend-functionality)
- [Styling](#styling)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Features

- **Multiple Search Options**: 
  - Search bar with city suggestions as you type
  - Full dropdown menu with filterable city list
  - Quick access to Lithuania's three largest cities (Vilnius, Kaunas, Klaipėda)
  - User-specific frequently searched cities (top 3 based on search history)

- **5-Day Weather Forecast**:
  - Day and weekday display
  - Average daytime temperature (11:00-17:00)
  - Animated weather condition icons using Lottie
  - Wind speed and humidity information
  - Detailed temperature breakdown by time period:
    - Morning (05:00-11:00)
    - Day (11:00-17:00)
    - Evening (17:00-23:00)
    - Night (23:00-05:00)

- **User Interaction Tracking**:
  - Search history saved to localStorage
  - City selection events logged in backend console
  ![backendLog](/documentationPhotos/backendLog.png)
  - User search data (city and timestamp) stored in MongoDB
  ![MongoDB](/documentationPhotos/mongoDB.png.png)

## Technologies Used 

### Frontend
- React + Vite
- Bootstrap (using [Bootswatch Morph theme](https://bootswatch.com/morph/))
- SASS for custom styling
- React Icons
- Lottie React for animated weather icons
- React Testing Library & Jest for unit testing search tools

### Backend
- Node.js
- Express.js
- Mongoose
- MongoDB

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB

### Setup

1. Clone the repository:
```bash
git clone https://github.com/VeronikaSindeikyte/weather-app
cd weather-app
```

2. Install dependencies for frontend and backend:
```bash
npm install
```

3. Create .env file in the server directory with the following variable:
```bash
URI=your_mongodb_connection_string/
```

4. Start the application:

### Frontend: 
```bash
npm run dev
```

### Backend: 
```bash
node server.js
```

## Usage

1. Open your browser and navigate to `http://localhost:5174` (or the port specified by Vite)

2. Use one of the search options to find a city:

- Type in the search bar to see suggestions
- Use the dropdown menu to select from all cities
- Click on one of the three major Lithuanian cities
- Select one of your frequently searched cities

![searchTools](/documentationPhotos/searchTools.png)

3. View the detailed 5-day weather forecast for the selected city

![5-dayForecast](/documentationPhotos/5-dayForecast.png)

## Key Endpoints Used: 
- `/places` - To get the list of available cities
- `/places/{city}/forecasts/long-term` - To get the forecast timestamps for a specific city


## Search Functionality: 

### Search Bar:
The search bar provides suggestions as you type. When you begin typing a city name, a dropdown appears with matching city suggestions.

### Dropdown Menu:
The full dropdown menu contains all available cities. You can scroll through the list or start typing to filter the options based on your input.

### Quick Access Options:

- **Major Cities**: One-click access to Vilnius, Kaunas, and Klaipėda
- **Frequently Searched**: Displays your three most frequently searched cities, determined from your local search history

## Weather Display:
For each selected city, the application displays:

### Main Card:
- Day and weekday
- Average daytime temperature (calculated from 11:00-17:00 readings)
- Animated weather condition icon (using Lottie animations)
- Text description of weather conditions
- Wind speed
- Humidity percentage

### Time Period Breakdown:
Average temperatures for four periods of the day:

- Morning: 05:00-11:00
- Day: 11:00-17:00
- Evening: 17:00-23:00
- Night: 23:00-05:00

## Backend Functionality:
The backend server provides the following functionality:

1. **API**: Interfaces with the api.meteo.lt service
2. **User Interaction Logging**: Records all city selections with timestamps
3. **Data Storage**: Saves user search patterns to MongoDB

## Data Model: 

```bash
{
  city: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}
```

## Styling:
The application uses the Bootswatch Morph theme as a base, with custom SASS styling.

Key styling features include:

- Responsive design for all device sizes
- Custom animations for weather condition display

## Project Structure: 
```
weather-app/
├── backend/                         # Backend files: server.js, CitySelectionMode.js, .env
├── node_modules/                    # Backend dependencies
├── public/                          # Static files
├── src/
│   ├── animations/                  # Lottie animation JSON files
│   ├── assets/                      # React.svg
│   ├── components/                  # React components
│   │   ├── SearchTools/             # Search tools
│   │       ├── DropdownMenu         # Dropdown menu jsx file, styles and tests
│   │       ├── SearchBar/           # Search Bar jsx file, styles and tests
│   │       └── ThreeCitiesSelect/   # Three major Lithuania cities jsx file, styles and tests
|   |   ├── WeatherApp/              # Main file with all components
|   |   ├── WeatherDisplay/          # 5-day forecast display cards
│   ├── App.jsx                      # Main App component
│   ├── main.jsx                     # main file
│   ├── .eslintrc
│   ├── .gitignore
│   ├── babel.config.json            # Babel configuration file
│   ├── bootstrap.min.css            # Bootstrap theme file
│   ├── eslint.config.js
│   ├── index.html               
│   ├── jest.config.js               # Jest testing library configuration
│   ├── package-lock.json
│   ├── package.json                 # Frontend dependencies
│   ├── README.md                    # Project documentation
│   └── vite.config.js

```



## Contact

For any questions, reach out to:
- **Author**: Veronika Sindeikyte
- **Email**: [veronika.sindeikyte@gmail.com]
- **GitHub**: [VeronikaSindeikyte](https://github.com/VeronikaSindeikyte)