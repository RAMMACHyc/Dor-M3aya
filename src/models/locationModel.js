import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
 
    latutude: {
        type: Number,
        required: [true, 'Please add a latitude'],
    },
    longitude: {
        type: Number,
        required: [true, 'Please add a longitude'],
    },
    // formattedAddress: String,
    // street: String,
    // city: String,
    // state: String,
    // zipcode: String,
    // country: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model('Location', locationSchema)