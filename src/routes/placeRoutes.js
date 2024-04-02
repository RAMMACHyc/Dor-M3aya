const express = require('express');
const router = express.Router();
import {placeController} from '../controllers/placesController';



router.post('/', placeController.createPlace);
router.get('/', placeController.getPlaces);


module.exports = router;
