// a node.js webserver without any frameworks
// run: "node ./server"

const express = require('express')

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

// start node express
const app = express()

app.use(express.static('build'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

