const Workout = require('../model/workoutModel');
const mongoose = require('mongoose');

// --get all workouts
const getWorkouts = async (req, res) => {
  try {
    // newest at top
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

// --get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  // check format of id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` })
  }

  const singleWorkout = await Workout.findById(id)

  // check exist
  if (!singleWorkout) {
    // "return" for don't run rest of code
    return res.status(404).json({ error: `No such workout` })
  }

  res.status(200).json(singleWorkout)
}

// --create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  let emptyFields = []
  if (!title) emptyFields.push('title')
  if (!reps) emptyFields.push('reps')
  if (!load) emptyFields.push('load')
  if (emptyFields.length > 0) return res.status(400).json({ error: 'please fill in all the fields', emptyFields })

  // add doc to db
  try {
    const workout = await Workout.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// --delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  // check format of id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` })
  }

  // "_" in mongoose we don't have id
  const deletedWorkout = await Workout.findByIdAndDelete(id)

  // check exist
  if (!deletedWorkout) {
    // "return" for don't run rest of code
    return res.status(404).json({ error: `No such workout` })
  }

  res.status(200).json(deletedWorkout)
}

// --update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  // check format of id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No such workout` })
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(id, { ...req.body })

  // check exist
  if (!updatedWorkout) {
    // "return" for don't run rest of code
    return res.status(404).json({ error: `No such workout` })
  }

  res.status(200).json(updatedWorkout)
}



module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
}