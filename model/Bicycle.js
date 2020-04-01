const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bicycleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rented: {
        type: Boolean,
        required: true
    }
}, { versionKey: false });

module.exports = model('Bicycles', bicycleSchema);

