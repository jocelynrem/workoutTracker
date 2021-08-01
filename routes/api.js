const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.post("/api/workout", async (req, res) => {
  try {
        var result = await Workout.save();
        res.send(result);
  } catch(err) {
    res.status(400).send(err)
  };
});

router.get("/api/workouts", async (req, res) => {
  try {
    var result = await Workout.find().exec();
    res.send(result);
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;