// a node.js webserver without any frameworks
// run: "node ./server"

var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
var sqlite3 = require("sqlite3").verbose();

// load the base-page template to RAM
var indstr = fs.readFileSync("index.ejs", "utf-8");

// make a database connection
function connectdb() {
   return new sqlite3.Database('./db/meerkat.db', (err) => {
      if (err) {
         return console.error(err.message);
      } 
      console.log("Meerkat database connection initiated.");
   });
}

function closedb(db) {
   db.close();
   console.log("Db connection closed.")
}

function render_index_page(response, db, username) {
   var notes = [];
   // find notes, with each do a callback, after query go to another callback
   db.each("SELECT * FROM notes WHERE user=?",(username), function (err, row) {
      notes.push(row.note);
   }, function (err, cntx) {
      // here we know query is done, I guess
      response.write(ejs.render(indstr, {"notes":notes}));
      response.end();});
      closedb(db);
}

function render_404(response) {
   response.writeHead("404");
   response.write("File not found!");
   response.end();
}


var username = "user1"

// response to http-request
function on_request(request, response) {

   response.writeHead(200, {"Content-Type": "text/html"});
   if (request.method == "GET") {
      // send the user index page
      if (request.url == "/") {
         // if the user wants index page
         fs.readFile("./index.ejs", null, function(error,data) {
            if (error) {
               render_404(response);
            } else {
               // all okay, render page with database stuff
               let db = connectdb();

               render_index_page(response, db, username);
            }
         })
         } else {
            render_404(response);
      }
   } else if (request.method == "POST") {
      // user posted something, prosess the post request
      var posted = "";
      request.on("data", function (chunk) {
         posted += chunk.toString();
      });

      request.on("end", function(){
         // when transfer has ended, add new note to db
         var a = posted.split("=")
         if (a[0] == "note") {
            let db = connectdb();
            db.run("INSERT INTO notes (note, user) VALUES (?,?)", [a[1], username], (err) => {
               if (err) {
                  console.log("something went wrong.");
                  return;
               }
               // when query okay, render page again
               render_index_page(response, db, username);
            });
         }         
     });
   }
}

http.createServer(on_request).listen(8000);