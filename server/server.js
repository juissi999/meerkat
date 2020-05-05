// run: 'node ./server'
// Specify port on .env

const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const noteRouter = require('./notes/routes')
const fileRouter = require('./files/routes')

// use cli arguments to decide listening port
const PORT = process.env.PORT || 80

// start node express
const app = express()
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/notes', noteRouter)

app.use('/files', fileRouter)

// return index for all the other routes which are not find so
// that they will lead to mainpage
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
