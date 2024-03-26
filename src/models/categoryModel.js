const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for the category'],
        unique: true
    },
    icon: {
        type: String,
        required: [true, 'Please add an icon for the category']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
