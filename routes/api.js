const router = require("express").Router();
const { response } = require("express");
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

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    })
});

// router.put("/api/workouts/:id", async (req, res) => {
//     Workout.aggregate([
//       { $match: { _id: req.params.id } },
//       { $addFields: { exercises: req.body } }
//     ])
//     .then((response) => {
//       res.json(response)
//     })
//     .then((err) => {
//       res.json(err)
//     })
// })

router.put("/api/workouts/:id", async (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id, { 
      $push: { 
        exercises: req.body } 
      })
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router;