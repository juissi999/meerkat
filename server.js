// a node.js webserver without any frameworks
// run: "node ./server"

var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
var sqlite3 = require("sqlite3").verbose();

// load the base-page template to RAM
var indexfile = "views/index.ejs";
var index_view = fs.readFileSync(indexfile, "utf-8");
var dbname = "./db/meerkat.db";


function return_css(response) {

   var fileContents = fs.readFileSync('./css/style.css', {encoding: 'utf8'})
   response.writeHead(200, {'Content-type' : 'text/css'});
   response.write(fileContents);
   response.end();
}

function render_index_page(response, username) {
   var notes = [];
   
   // find notes, with each do a callback, after query go to another callback
   let db =  new sqlite3.Database('./db/meerkat.db', (err) => {
      if (err) {
         return console.error(err.message);
      }
      console.log("Connected to meerkat database.")

      db.each("SELECT * FROM notes WHERE user=?", (username), function (err, row) {
         notes.push(row.note);
      }, function (err, cntx) {
         // here we know query is done, I guess

         response.write(ejs.render(index_view, {"notes":notes, "loginpage":false, "username":username}));
         response.end();});
   });
   db.close();
}

function add_note(response, username, note) {
   let db = new sqlite3.Database('./db/meerkat.db', (err) => {
      if (err) {
         return console.error(err.message);
      }
      console.log("Connected to meerkat database.")
      // make insertion to table
      db.run("INSERT INTO notes (note, user) VALUES (?,?)", [note, username], (err) => {
         if (err) {
            console.log("something went wrong.");
            return;
         }
         // when query okay, render page again
         render_index_page(response, username);
      });
   });
}

function login(response, username) {
   var session_id = Math.floor(Math.random()*100);

   // put session_id to cookie so that browser remembers that
   response.writeHead(200, {"Content-Type": "text/html", "Set-Cookie": "session_id=" + session_id});

   let db = new sqlite3.Database('./db/meerkat.db', (err) => {
      if (err) {
         return console.error(err.message);
      }
      console.log("Connected to meerkat database.");
      
      // insert session id to database
      db.run("INSERT INTO sessions (session_id, user) VALUES (?,?)", [session_id, username], (err) => {
         if (err) {
            console.log("something went wrong.");
            return;
         }

         render_index_page(response, username);
      });
   });
}

function logout(response, session_id) {
   let db = new sqlite3.Database('./db/meerkat.db', (err) => {
      if (err) {
         return console.error(err.message);
      }
      db.run("DELETE FROM sessions WHERE session_id = ?", session_id, (err) => {
         if (err) {
            console.log("something went wrong.");
            return;
         }
         render_login_page(response);
      });
      db.close();
   });
}
 
function render_login_page(response) {
   response.write(ejs.render(index_view, {"notes":[], "loginpage":true, "username":"null"}));
   response.end();
}

function render_404(response) {
   response.writeHead("404");
   response.write("File not found!");
   response.end();
}

function parseCookies (request) {
   var list = {},
       rc = request.headers.cookie;

   rc && rc.split(';').forEach(function( cookie ) {
       var parts = cookie.split('=');
       list[parts.shift().trim()] = decodeURI(parts.join('='));
   });

   return list;
}

// response to http-request
function on_request(request, response) {

   response.writeHead(200, {"Content-Type": "text/html"}); // , 'Set-Cookie': 'mycookie=test'

   var cookies = parseCookies(request);
   var username = "unknown";

   // get cookies and check if user is logged in
   if ("session_id" in cookies) {
      var session_id = cookies.session_id;
      let db =  new sqlite3.Database('./db/meerkat.db', (err) => {
         if (err) {
            return console.error(err.message);
         }
         var session_found = false;
         db.each("SELECT * FROM sessions WHERE session_id=?", (session_id), function (err, row) {
            // TODO: make this better, add timeout etc
            username = row.user;
            session_found = true;
         }, function () {
            // check that session was found and if not, render login_page,
            // otherwise render index

            // process the request according to if session id was found
            if (request.method == "GET") {
               // send the user index page
               if (request.url == "/") {
                  // if the user wants index page
                  // all okay, render page with database stuff
                  if (session_found) {
                     render_index_page(response, username);
                  } else {
                     render_login_page(response);
                  }
               } else if (request.url === '/css/style.css') {
                  return_css(response);
               }
               else {
                  render_404(response);
               }
            } else if (request.method == "POST") {
               // user posted something, prosess the post request
               var posted = "";
               request.on("data", function (chunk) {
                  posted += chunk.toString();
               });
         
               request.on("end", function() {
                  // when transfer has ended, add new note to db
                  var a = posted.split("=")
         
                  if (session_found) {
                     if (a[0] == "note") {
                        // note addition
                        add_note(response, username, a[1]);
                     } else {
                        // logoutform only option left
                        logout(response, session_id);
                     }
                  } else {
                     // no session found
                     if (a[0] == "username") {
                        // login, create random session_id
                        login(response, a[1]);
                     }
                  }
               });
            }


         });
      });
      db.close()
   } else {
      render_login_page(response);
      return;
   }
}

http.createServer(on_request).listen(8000);