const router = require("express").Router();
const Workout = require("../models/Workout.js");



// router.post("/api/exercise", ({ body }, res) => {
//     Workout.create(body)
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
//   });


router.get("/exercise", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;