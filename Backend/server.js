require('dotenv').config();

const express = require('express');
const workoutRouts = require('./routes/workouts');

// express app
const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(`path: ${req.path}
  method: ${req.method}`);
  next()
})

// routes
app.use('/api/workouts', workoutRouts)

// listen for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

