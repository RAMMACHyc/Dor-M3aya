import Place from '../models/placeModel';
import Category from '../models/categoryModel';
import Location from '../models/locationModel';

export const placeController = {
  createPlace: async (req, res) => {
    try {
      const {city, placeName, categoryId } = req.body;
      const { latitude, longitude } = req.body.location;
      if (!city || !placeName|| !categoryId || !latitude || !longitude) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
      const location = await Location.create({ latitude, longitude });
      const place = await Place.create({ city, placeName, category: categoryId, location: location._id });
      await Category.findByIdAndUpdate(categoryId, { $push: { places: place._id } });
      return res.status(201).json(place);
    } catch (error) {
      return res.status(400).json({ message: error.message }); 
    }
  },


  getPlaces: async (req, res) => {
    try {
      const places = await Place.find()
        .populate({
          path: 'location',
          select: 'latitude longitude'
        })
        .populate({
          path: 'category',
          select: 'name IconName color' 
        });
  
      const placesCoordinates = places.map(place => {
        return {
          city: place.city,
          placeName: place.placeName,
          category: {
            name: place.category.name,
            IconName: place.category.IconName,
            color: place.category.color
          },
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
