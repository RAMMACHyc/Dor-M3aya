import {Location} from '../models/locationModel.js';


export const LocationController = {
    
      getLocations: async (req, res) => {
     try {
        const locations = await Location.find();
        res.status(200).json(locations);
     } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
     }
      },

      
      createLocation: async (req, res) => {
    
     try {
        const { latutude, longitude } = req.body;
        console.log(req.body);
      
    
        if (!(latutude && longitude)) {
          return res.status(400).json({ error: 'Please provide all required fields' });
        }
    
        const newLocation = new Location({
          latutude,
          longitude,
        });
    
        const savedLocation = await newLocation.save();
    
        res.status(201).json({
          message: 'Location created successfully',
          location: savedLocation,
        });
     } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
     }
      },

        }
        export default LocationController;