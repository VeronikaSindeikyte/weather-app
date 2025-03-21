import mongoose from 'mongoose'

const CitySelectionSchema = new mongoose.Schema({
  city: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const CitySelection = mongoose.model('CitySelection', CitySelectionSchema)

export default CitySelection