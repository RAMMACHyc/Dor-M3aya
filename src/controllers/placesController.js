const Place = require('../models/placeModel');


// @desc    Get all places
// @route   GET /api/places
// @access  Public

exports.getPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get a single place by ID
// @route   GET /api/places/:id
// @access  Public

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a new place
// @route   POST /api/places
// @access  Private (you may want to implement authentication)

exports.createPlace = async (req, res) => {
    const place = new Place({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image,
    });

  

    try {
        const newPlace = await place.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a place by ID
// @route   PUT /api/places/:id
// @access  Private (you may want to implement authentication)

exports.updatePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        place.title = req.body.title || place.title;
        place.description = req.body.description || place.description;
        place.location = req.body.location || place.location;
        place.image = req.body.image || place.image;
        place.rating = req.body.rating || place.rating;
        const updatedPlace = await place.save();
        res.status(200).json(updatedPlace);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a place by ID
// @route   DELETE /api/places/:id
// @access  Private (you may want to implement authentication)

exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        await place.remove();
        res.status(200).json({ message: 'Place deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
