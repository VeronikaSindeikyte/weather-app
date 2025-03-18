import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'

const app = express();
const PORT = process.env.PORT || 3000

dotenv.config()
app.use(cors());

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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});