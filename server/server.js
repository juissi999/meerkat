// run: 'node ./server'
// Specify port on .env

// get environmental variables
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ip = require('ip')

const path = require('path')
const noteRouter = require('./routes/noteRoutes')
const fileRouter = require('./routes/fileRoutes')

const dbState = require('./middlewares/dbState')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

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

// setup swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meerkat API',
      version: '1.0.0',
      description: 'Description of the Meerkat API'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Meerkat API Documentation'
      }
    ]
  },
  apis: ['server/notes/routes.js', 'server/files/routes.js'] //['./routes/*.js']
}

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

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
