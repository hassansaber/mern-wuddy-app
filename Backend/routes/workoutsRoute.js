const express = require('express');
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');


const router = express.Router()

// middleware
// require auth for all workout routes
// runs middleware before all methods after him
// to protect all of them
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router