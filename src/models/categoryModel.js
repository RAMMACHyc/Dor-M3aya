const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for the category'],
        unique: true
    },
    IconName: {
        type: String,
        required: [true, 'Please add an icon for the category']
    },
    color: {
        type: String,
        required: [true, 'Please add a color for the category']
    },
    
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        }
  ],  

}, { 
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
