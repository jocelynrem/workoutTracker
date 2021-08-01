const router = require("express").Router();
const Workout = require("../models/Workout.js");

const duration = { totalDuration: { $sum: "$exercises.duration" } };

router.post("/api/workout", async ({ body }, res) => {
  try {
    const result = await Workout.create(body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err)
  };
});

router.put("api/workouts/:id", async (req, res) => {
  try {
    const result = await Workout.aggregate([
      { $match: { _id: req.params.id } },
      { $addFields: { exercises: req.body } }
    ])
    res.status(200).json(result);
    console.log('result:', result)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/api/workouts', async (req, res) => {
  try {
    const result = await Workout.aggregate([{ $set: duration }]);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get("/api/workouts/range", async (req, res) => {
  try {
    const result = await Workout.aggregate([{ $set: duration }, { $sort: { 'day': -1 } }, { $limit: 7 }]);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;