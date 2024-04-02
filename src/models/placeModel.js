import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, 'Please add a city'],
  },
  placeName: {
    type: String,
    required: [true, 'Please add a place name'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please add a category'],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: [true, 'Please add a location'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Place', placeSchema);

const place = mongoose.model('Place', placeSchema);
export default place 