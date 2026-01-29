const express = require('express')
const { 
  createHabit, 
  getHabits, 
  getHabit, 
  deleteHabit, 
  updateHabit 
} = require('../controllers/habitController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require auth for all habits routes
router.use(requireAuth)

// GET all habits
router.get('/', getHabits)

// GET single habits
router.get('/:id', getHabit)

// POST a new habits
router.post('/', createHabit)

// DELETE a habits
router.delete('/:id', deleteHabit)

// UPDATE a habits
router.patch('/:id', updateHabit)

module.exports = router
