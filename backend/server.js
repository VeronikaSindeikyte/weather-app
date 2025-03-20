import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'
import bodyParser from 'body-parser'


const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(cors())
app.use(bodyParser.json())


// GET weather information for a specific city
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`)
    res.json(response.data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
});


// GET city names for the dropdown menu
app.get('/cities', async (req, res) => {
  try {
    const response = await axios.get(`https://api.meteo.lt/v1/places/`)
  
    const cityNames = response.data.map(place => place.name)
    
    res.json(cityNames)
  } catch (error) {
    console.error('Error fetching cities:', error)
    res.status(500).json({ error: 'Failed to fetch city names' })
  }
})

// POST to log city names to the backend console
app.post('/api/log-city-selection', (req, res) => {
  const { city } = req.body
  
  if (!city) {
    return res.status(400).json({ error: 'No selected city was found' })
  }
  
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] User selected city: ${city}`)
  
  res.status(200).json({ 
    success: true, 
    message: 'City selection logged successfully',
    timestamp,
    city
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})