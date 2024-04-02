import Place from '../models/placeModel';
import Category from '../models/categoryModel';
import Location from '../models/locationModel';

export const placeController = {
  createPlace: async (req, res) => {
    try {
      const { city, categoryId } = req.body;
      console.log(req.body);
      const { latitude, longitude } = req.body.location;
      if (!city || !categoryId || !latitude || !longitude) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
      const location = await Location.create({ latitude, longitude });
      const place = await Place.create({ city, category: categoryId, location: location._id });
      await Category.findByIdAndUpdate(categoryId, { $push: { places: place._id } });
      return res.status(201).json(place);
    } catch (error) {
      return res.status(400).json({ message: error.message }); 
    }
  },


  getPlaces: async (req, res) => { 
    try {
      const places = await Place.find().populate({
        path: 'location',
        select: 'latitude longitude'
      });
      const placesCoordinates = places.map(place => {
        return {
          city: place.city,
          latitude: place.location ? place.location.latitude : null,
          longitude: place.location ? place.location.longitude : null
        };
      });

      return res.status(200).json(placesCoordinates);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

};
