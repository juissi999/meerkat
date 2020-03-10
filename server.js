// a node.js webserver without any frameworks
// run: "node ./server"

const fs = require("fs")
const ejs = require("ejs")
const sqlite3 = require("sqlite3").verbose()
const qs = require("querystring")
const crypto = require("crypto")
const dbpath = require("./dbpath")
const express = require('express')



// load the base-page template to RAM
var indexfile = "views/index.ejs";
var index_view = fs.readFileSync(indexfile, "utf-8");
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

app.use('/css', express.static(__dirname + '/css'));

app.get('/', on_get)

app.post('/', on_post)

app.post('/notes/', on_note_post)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

var db = new sqlite3.Database(dbpath, (err) => {
  // connect to database and start server
  if (err) {
    return console.error(err.message);
  }
})

