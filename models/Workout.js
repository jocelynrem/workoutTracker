// Set up Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define Schema
const workoutSchema = new Schema({
  day: {
    type: Number,
    default: new Date(),
  },
  exercises: Array,
}, {
  versionKey: false,
});

// Link Schema
const Workout = mongoose.model("Workout", workoutSchema);

// Export Handle for Schema
module.exports = Workout;