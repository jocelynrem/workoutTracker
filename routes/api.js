const router = require("express").Router();
const Workout = require("../models/Workout.js");

const duration = { totalDuration: { $sum: "$exercises.duration" } };

// router.post('/api/workout', ({ body }, res) => {
//   Workout.save(body)
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     })
// })

router.post("/api/workouts", async ({ body }, res) => {
  try {
    console.log('body:', body)
    const result = await Workout.create(body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err)
  };
});

// router.post('/api/workout', ({ body }, res) => {
//   const exercise = body

//   Workout.save(exercise, (err, saved) => {
//     (err ? res.status(400).json(err) : res.status(200).json(saved))
//   });
// })


// router.put("api/workouts/:id", async (req, res) => {
//   try {
//     const result = await Workout.aggregate([
//       { $match: { _id: req.params.id } },
//       { $addFields: { exercises: req.body } }
//     ])
//     res.status(200).json(result);
//     console.log('result:', result)
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })

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