
import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    image: {
        type: String,
        required: [true, 'Please add an image'],
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
    },
  
}, {
    timestamps: true
})

module.exports = mongoose.model('Place', placeSchema)
