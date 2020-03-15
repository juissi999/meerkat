// a node.js webserver without any frameworks
// run: "node ./server"

const express = require('express')
const bodyParser = require('body-parser')
const dbservice = require('./dbservice')

var cookie_ttl = 60*60; // seconds: 60*60*24 is one day

// accept cli arguments and remove unnecessary
var arguments = process.argv.slice(2)

// use cli arguments to decide listening port
var PORT = 80
if (arguments.length > 1) {
  // too much arguments
  console.error("Maximum argument count 1: port for server to listen")
  return
} else if (arguments.length == 1) {
  // right amount of arguments
  PORT = Number(arguments[0])
  if (isNaN(PORT)) {
    // make sure argument was a proper number
    console.error("Expecting a numerical argument.")
    return
  }
}

// start node express
const app = express()
app.use(bodyParser.json())
app.use(express.static('build'))

app.get('/notes', (request, response) => {
  dbservice.getAllNotes((err, notes)=>{
    if (err) {
      return console.log(err)
    }
    response.json(notes) 
    })
})

app.post('/notes', (request, response) => {
  const posttime = Date.now()
  const noteid = Math.floor(Math.random()*1000000000);
  const note = {text:request.body.text, noteid:noteid, date:posttime}

  if (!note.text) {
    return response.status(400).json({
      error: 'content missing' 
    })
  }

  dbservice.putNote(noteid, note.text, posttime, (err) =>{
    if (err) {
      return console.log(err)
    }
    response.json(note)
  })
})

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  dbservice.deleteNote(id, (err) =>{
    if (err) {
      return console.log(err)
    }
    response.status(204).end()
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
