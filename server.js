// a node.js webserver without any frameworks
// run: "node ./server"

const express = require('express')
const bodyParser = require('body-parser')

var cookie_ttl = 60*60; // seconds: 60*60*24 is one day

// accept cli arguments and remove unnecessary
var arguments = process.argv.slice(2);

// use cli arguments to decide listening port
var PORT = 80
if (arguments.length > 1) {
  // too much arguments
  console.error("Maximum argument count 1: port for server to listen");
  return;
} else if (arguments.length == 1) {
  // right amount of arguments
  PORT = Number(arguments[0])
  if (isNaN(PORT)) {
    // make sure argument was a proper number
    console.error("Expecting a numerical argument.");
    return;
  }
}

let notes = []

// start node express
const app = express()
app.use(bodyParser.json())
app.use(express.static('build'))

app.get('/notes', (request, response) => response.json(notes))

app.post('/notes', (request, response) => {
  const note = request.body

  if (!note.text) {
    return response.status(400).json({
      error: 'content missing' 
    })
  }

  note['date'] = Date.now()
  note['id'] = notes.reduce((accumulator, currentvalue) => {
    if (currentvalue.id >= accumulator) {
      return currentvalue.id
    } else {
      return accumulator
    }
  }, 0) + 1

  notes = notes.concat(note)
  response.json(note)
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

