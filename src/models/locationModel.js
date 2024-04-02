import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
 
    latitude: {
        type: Number,
        required: [true, 'Please add a latitude'],
    },
    longitude: {
        type: Number,
        required: [true, 'Please add a longitude'],
    },
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        }
  ], 
    
}, {
    timestamps: true
})

const location = mongoose.model('Location', locationSchema);
export default location 