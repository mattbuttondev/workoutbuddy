const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({ user_id: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: "Workout not found" })
    }

    const workout = await Workout.findOne({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" })
    }

    if (!new mongoose.Types.ObjectId(workout.user_id).equals(req.user._id)) {
        return res.status(401).json({ error: "You are not authorised to view this workout" })
    }

    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    const emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (!load) {
        emptyFields.push('load')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "You must include all fields", emptyFields })
    }

    const workout = await Workout.create({ title, reps, load, user_id: req.user._id })

    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: "Workout not found" })
    }

    const workout = await Workout.findOne({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" })
    }

    if (!new mongoose.Types.ObjectId(workout.user_id).equals(req.user._id)) {
        return res.status(401).json({ error: "You are not authorised to update this workout" })
    }


    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json(updatedWorkout)
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: "Workout not found" })
    }

    const protectedWorkoutIds = ['6553b220f0933e52d9f8f90b', '6553b210f0933e52d9f8f908', '6553b202f0933e52d9f8f905', '6553b1f9f0933e52d9f8f902'];

    if (protectedWorkoutIds.includes(id)) {
        return res.status(401).json({ error: 'This workout is part of a test account and cannot be deleted. Please create a workout for yourself using the form below.' })
    }

    const workout = await Workout.findOne({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" })
    }

    if (!new mongoose.Types.ObjectId(workout.user_id).equals(req.user._id)) {
        return res.status(401).json({ error: "You are not authorised to delete this workout" })
    }


    const deletedWorkout = await Workout.findByIdAndDelete(id)

    res.status(200).json(deletedWorkout)
}

const deleteAllWorkouts = async (req, res) => {
    Workout.deleteMany({})
        .then(() => {
            res.status(200).json({ message: "Successfully deleted all workouts" })
        })
        .catch((error) => {
            res.status(200).json({ error: error.message })
        })
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    deleteAllWorkouts
}