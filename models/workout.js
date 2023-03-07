const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    workout: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, required: true
    },
    date: {
        type: Date,
        required: false
    }

},
{
    timestamps: true
});

const Workout = mongoose.model('workout', workoutSchema)

module.exports = Workout