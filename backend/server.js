import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import CitySelection from './CitySelectionModel.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

app.use(cors());
app.use(bodyParser.json());


// GET weather information for a specific city
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


// GET city names for the dropdown menu
app.get('/cities', async (req, res) => {
  try {
    const response = await axios.get(`https://api.meteo.lt/v1/places/`);

    const cityNames = response.data.map(place => place.name);

    res.json(cityNames);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch city names' });
  }
});

// POST to log city names to the backend console and save it to mongoDB
app.post('/api/log-city-selection', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'No selected city was found' });
  }

  try {
    const newSelection = new CitySelection({ city });
    await newSelection.save();

    console.log(`✅ City selection saved: ${newSelection.city} at time: ${newSelection.timestamp}`);


    res.status(200).json({
      success: true,
      message: 'City selection logged successfully',
      city
    });
  } catch (error) {
    console.error('Error saving city selection:', error);
    res.status(500).json({ error: 'Failed to save city selection' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));