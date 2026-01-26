require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')

const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://habitus-app.netlify.app",
    "https://*.netlify.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}

// express app
const app = express()

// middleware
app.use(cors(corsOptions));
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.path} ${req.method}`)
  next()
})

// routes
app.use('/api/workouts', workoutsRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connect to db and listenning on http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
