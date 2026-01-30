const Habit = require('../models/habitModel')
const mongoose = require('mongoose')

// get all habits
const getHabits = async (req, res) => {
  try {
    const user_id = req.user._id
    const habits = await Habit.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(habits)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get a single habit
const getHabit = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such habit' })
  }

  const habit = await Habit.findById(id)

  if (!habit) {
    return res.status(404).json({ error: 'No such habit' })
  }

  res.status(200).json(habit)
}


// create a new habit
const createHabit = async (req, res) => {
  const { title, date } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }

  if (!date) {
    emptyFields.push('date')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const habit = await Habit.create({ title, date, user_id })
    res.status(200).json(habit)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a habit
const deleteHabit = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such habit' })
  }

  const habit = await Habit.findOneAndDelete({_id: id})

  if (!habit) {
    return res.status(400).json({ error: 'No such habit' })
  }

  res.status(200).json(habit)
}

// update a habit
const updateHabit = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such habit' })
  }

  const habit = await Habit.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!habit) {
    return res.status(400).json({ error: 'No such habit' })
  }

  res.status(200).json(habit)
}

module.exports = {
  getHabits,
  getHabit,
  createHabit,
  deleteHabit,
  updateHabit
}