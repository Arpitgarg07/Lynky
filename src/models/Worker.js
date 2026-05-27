const mongoose = require('mongoose');


const workerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },
 
    service: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    locality: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});


module.exports =
    mongoose.model('Worker', workerSchema);