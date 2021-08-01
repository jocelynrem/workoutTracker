const router = require("express").Router();
const Workout = require("../models/Workout.js");

const duration = { totalDuration: { $sum: "$exercises.duration" } };

router.post("/api/workout", async (req, res) => {
  try {
    var result = await Workout.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err)
  };
});

router.get('/api/workouts', async (req, res) => {
  try {
    var result = await Workout.aggregate([{ $set: duration }]);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/api/workouts/range", async (req, res) => {
  try {
    var result = await Workout.aggregate([{ $set: duration }, { $sort: { 'day': -1 } }, { $limit: 7 }]);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;