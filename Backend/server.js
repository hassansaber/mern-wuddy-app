require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
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

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`connected to db `);

    // listen for requests
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error);
  })


