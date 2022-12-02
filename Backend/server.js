require('dotenv').config();
const express = require('express');

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(`path: ${req.path}
  method: ${req.method}`);
  next()
})

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the app' })
})

// listen for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

