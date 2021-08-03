const router = require("express").Router();
const Workout = require("../models/Workout");

const duration = { totalDuration: { $sum: "$exercises.duration" } };

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

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const result = new Workout.create(body);
    await result.save()
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err)
  };
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    const result =  Workout.aggregate([
      { $match: { _id: req.params.id } },
      { $addFields: { exercises: req.body } }
    ])
    await result.save()
    res.status(200).json(result);
    console.log('result:', result)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;