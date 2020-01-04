// build script to set up database.
// run: node build_database

const sqlite = require("sqlite3").verbose()
const fs = require("fs")
const path = require("path")
const dbpath = require("./dbpath")

var dbdir = path.dirname(dbpath)

// check if database directory exists, if not -> create
if (!fs.existsSync(dbdir)){
  fs.mkdirSync(dbdir)
}

// define our sql-queries
var queries = [
"CREATE TABLE users(user TEXT PRIMARY KEY, password TEXT)",
"CREATE TABLE notes(note TEXT, user TEXT, posttime TEXT, noteid INT PRIMARY KEY)",
"CREATE TABLE sessions(session_id TEXT, user TEXT)",
"CREATE TABLE hashtags(noteid INT, hashtag TEXT, PRIMARY KEY (noteid, hashtag))"]

var queries_left = queries.length

// create database
let db = new sqlite.Database(dbpath, (err) => {
   if (err) {
    return console.error(err.message)
   }
    console.log("Database created.")

    // add tables
    for (let i=0;i<queries.length;i++) {
      db.run(queries[i], create_table_callback)
    }
});

function create_table_callback (err) {
  if (err) {
    return console.log(err.message)
  } else {
    console.log("Table created.")
  }
  queries_left--;
  if (queries_left==0) {
    console.log("All tables created succesfully. Closing database.")
    db.close();  }
}