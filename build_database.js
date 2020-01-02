// build script to set up database.
// run: node build

const sqlite = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

var dbdir = "./db";

if (!fs.existsSync(dbdir)){
    fs.mkdirSync(dbdir);
}

let db = new sqlite.Database(path.join(dbdir, "meerkat.db"), (err) => {
   if (err) {
     console.error(err.message);
   } else {
      console.log("Database created.");

      // add tables
      db.run("CREATE TABLE users(user TEXT PRIMARY KEY, password TEXT)", create_table_callback);
      db.run("CREATE TABLE notes(note TEXT, user TEXT, posttime TEXT, noteid INT PRIMARY KEY)", create_table_callback);
      db.run("CREATE TABLE sessions(session_id TEXT, user TEXT)", create_table_callback);
      db.run("CREATE TABLE hashtags(noteid INT, hashtag TEXT, PRIMARY KEY (noteid, hashtag))", create_table_callback);
   }
   db.close();
 });

 console.log(db)

function create_table_callback (err) {
  if (err) {
    return console.log(err.message);
  } else {
    console.log("Table created")
  }
}