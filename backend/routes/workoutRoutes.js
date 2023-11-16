const express = require('express');
const { getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout, deleteAllWorkouts } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth)

router.get('/', getAllWorkouts)
router.get('/:id', getSingleWorkout)
router.post('/', createWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)
router.delete('/', deleteAllWorkouts)

module.exports = router;