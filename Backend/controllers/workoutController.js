const Workout = require('../model/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    // newest at top
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` })

  }

  const singleWorkout = await Workout.findById(id)

  if (!singleWorkout) {
    // "return" for don't run rest of code
    return res.status(404).json({ error: `No such workout` })
  }

  res.status(200).json(singleWorkout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  // add doc to db
  try {
    const workout = await Workout.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// DELETE a workout
// UPDATE a workout


module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts
}