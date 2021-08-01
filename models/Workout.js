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

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;