// run: 'node ./server'
// Specify port on .env

// get environmental variables
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ip = require('ip')

const path = require('path')
const noteRouter = require('./notes/routes')
const fileRouter = require('./files/routes')

const dbState = require('./middlewares/dbState')

// connect to mongoDB
const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

// use env-variable to decide listening port
const PORT = process.env.PORT || 80

// get my ip
const IP = ip.address()

// start node express
const app = express()
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/api/notes', dbState, noteRouter)
app.use('/api/files', dbState, fileRouter)

// return index for all the other routes which are not find so
// that they will lead to mainpage
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on ip ${IP} port ${PORT}`)
})
