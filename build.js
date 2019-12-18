// build script to set up database.
// run: node build

const sqlite = require("sqlite3").verbose();

let db = new sqlite.Database("./db/meerkat.db", (err) => {
   if (err) {
     console.error(err.message);
   } else {
      console.log("Database created.");

      // add tables
      db.run("CREATE TABLE users(user TEXT PRIMARY KEY, password TEXT)", create_table_callback);
      db.run("CREATE TABLE notes(note TEXT, user TEXT, posttime TEXT)", create_table_callback);
      db.run("CREATE TABLE sessions(session_id TEXT, user TEXT)", create_table_callback);
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