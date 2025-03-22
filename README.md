# Weather App

A weather forecast application that provides 5-day weather forecasts for cities in Lithuania using the [api.meteo.lt](https://api.meteo.lt/) API. This application features multiple search tools, user interaction tracking, and detailed weather insights with animated visualizations.

## Table of Contents
- [Features](#features)
- [Technologies Used ](#Technologies-Used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Search Functionality](#search-functionality)
- [Weather Display](#weather-display)
- [Backend Functionality](#backend-functionality)
- [Styling](#styling)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

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
  - User search data (city and timestamp) stored in MongoDB

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

3. View the detailed 5-day weather forecast for the selected city

## Key Endpoints Used: 
- `/places` - To get the list of available cities
- `/places/{city-name}/forecasts/long-term` - To get the forecast timestamps for a specific city


