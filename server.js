// a node.js webserver without any frameworks
// run: "node ./server"

var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
var sqlite3 = require("sqlite3").verbose();
var qs = require("querystring");

// load the base-page template to RAM
var indexfile = "views/index.ejs";
var index_view = fs.readFileSync(indexfile, "utf-8");
var dbname = "./db/meerkat.db";
var cookie_ttl = 60*60; // seconds: 60*60*24 is one day

function return_css(response) {

   var fileContents = fs.readFileSync("./css/style.css", {encoding: "utf8"});
   response.writeHead(200, {"Content-type" : "text/css"});
   response.write(fileContents);
   response.end();
}

function render_index_page(response, username, selected_hashtags) {
   
   // find notes, with each do a callback, after query go to another callback
   let db =  new sqlite3.Database(dbname, (err) => {
      if (err) {
         return console.error(err.message);
      }

      var notes = [];
      if (Object.keys(selected_hashtags).length == 0) {
         // no special hashtags were selected or was selected "all"
         db.each("SELECT * FROM notes WHERE user=? ORDER BY datetime(posttime) DESC", (username), function (err, row) {
            notes.push({"text":row.note, "date":row.posttime});
         }, function (err, cntx) {
            // here we know query is done, I guess
            notes_retrieved_callback(response, username, notes, db, selected_hashtags)
         });
      } else {
         // special hashtags are expected
         // construct query
         let q = "SELECT note FROM notes WHERE user=\"" + username + 
                 "\" AND noteid IN (SELECT noteid FROM hashtags WHERE hashtag=\"" + selected_hashtags[0] + "\")";

         for (let i=1;i<selected_hashtags.length;i++) {
            q += " AND noteid IN (SELECT noteid FROM hashtags WHERE hashtag=\"" + selected_hashtags[i] + "\")"
         }
         q += " ORDER BY datetime(posttime) DESC";
         
         db.each(q, function (err, row) {
            notes.push({"text":row.note, "date":row.posttime});
         }, function (err, cntx) {
            if (err) {
               console.log(err.message)
            }
            // here we know query is done, I guess
            notes_retrieved_callback(response, username, notes, db, selected_hashtags)
         })
      }
   });
   db.close();
}


function notes_retrieved_callback(response, username, notes, db, selected_hashtags) {
   // find all hashtags for the posts
   var hashtags = [];
   db.each("SELECT DISTINCT hashtags.hashtag FROM hashtags, notes WHERE notes.user=? AND " + 
           "hashtags.noteid=notes.noteid ORDER BY (hashtags.hashtag) ASC", (username), function (err, row) {
      // retrieve all hashtags
      let ht = {};
      // can we find the hashtag retrieved from selected hashtags
      if (selected_hashtags.indexOf(row.hashtag)>=0) {
         ht["selected"] = true;
      } else {
         ht["selected"] = false;
      }
      ht["hashtag"] = row.hashtag
      hashtags.push(ht);
   }, function (err, cntx) {
      if (err) {
         console.log(err.message);
      }

      response.write(ejs.render(index_view, {"notes":notes, "loginpage":false, "username":username, "hashtags":hashtags}));
      response.end();
   });
}


function add_note(response, username, note, hashtags) {
   let db = new sqlite3.Database(dbname, (err) => {
      if (err) {
         return console.error(err.message);
      }
      // figure out what to put as unique identifier, decided to put random of very large num
      let noteid = Math.floor(Math.random()*1000000000);
      // TODO test that there are no same noteids present (do query and repeat if not going)
      // cant ask the id from database as during this time someone else could use it

      // make insertion to table
      db.run("INSERT INTO notes (noteid, note, user, posttime) VALUES (?, ?,?, datetime(\"now\", \"localtime\"))", [noteid, note, username], (err) => {
         if (err) {
            console.log("something went wrong.");
            return;
         }
         // add each hashtag
         if (hashtags.length == 0) {
            render_index_page(response, username, []);
         } else {
            var queries_left = hashtags.length;

            hashtags.forEach( element => { 
               db.run("INSERT INTO hashtags (noteid, hashtag) VALUES (?,?)", [noteid, element], (err) => { 
                  if (err) {
                     console.log("something went wrong.");
                     return;
                  }
                  queries_left--;

                  if (queries_left == 0) {
                     // every hashtag was added to database
                     // when query okay, render page again
                     render_index_page(response, username, []);
                  }
               });
            });
         }
      });
   });
   db.close();
}

function new_user(response, username, pwd) {
   // add a new user to users database

   let db = new sqlite3.Database(dbname, (err) => {
      if (err) {
         return console.error(err.message);
      }
      db.run("INSERT INTO users (user, password) VALUES (?,?)", [username, pwd], (err) => {
         if (err) {
            console.log("something went wrong. Username probably taken.");
            render_404(response);
            return;
         }
         render_login_page(response);
      });
   });
   db.close();
}

function login(response, username, pwd) {

   let db = new sqlite3.Database(dbname, (err) => {
      if (err) {
         return console.error(err.message);
      }
      
      // check if password is correct
      db.get("SELECT * FROM users WHERE user=? AND password=?", [username, pwd], (err, row) => {
         if (err) {
            console.log("something went wrong.");
            return;
         }

         if (typeof row === "undefined") {
            // password/user pair does not return anything - no login
            // TODO: maybe a better solution?
            render_login_page(response);
         } else {
            // login
            // put session_id to cookie so that browser remembers that
            var expiresattrib = new Date(Date.now() + cookie_ttl*1000 );
            var session_id = Math.floor(Math.random()*100);
            response.writeHead(200, {"Content-Type": "text/html", "Set-Cookie": "session_id=" + session_id + ";expires=" + expiresattrib});
                  // insert session id to database
            db.run("INSERT INTO sessions (session_id, user) VALUES (?,?)", [session_id, username], (err) => {
               if (err) {
                  console.log("something went wrong.");
                  return;
               }

               render_index_page(response, username, []);
            });
         }
      });
   });
   db.close();
}

function logout(response, session_id) {
   let db = new sqlite3.Database(dbname, (err) => {
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
   });
   db.close();
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

   rc && rc.split(";").forEach(function( cookie ) {
       var parts = cookie.split("=");
       list[parts.shift().trim()] = decodeURI(parts.join("="));
   });

   return list;
}

function find_hashtags(notestr) {
   let hashtags = [];

   notestr.split(" ").forEach( (element) => {
      if (element[0] == "#") {
         hashtags.push(element);
      }
   });
   return hashtags;
}

function process_post_request(request, response, session_found, session_id, username) {
   var posted = "";
   request.on("data", function (chunk) {
      posted += chunk.toString();
   });

   request.on("end", function() {
      var values = qs.parse(posted);

      if (session_found) {
         if ("note" in values) {
            // note addition
            let notestr = values["note"];
            // find hashtags
            let hashtags = find_hashtags(notestr);

            // add_note
            add_note(response, username, notestr, hashtags);
         } else if ("selected_hashtag" in values) {

            // retrieve the button that user pressed
            var pressed = values.selected_hashtag;

            // remove pressed id from valuelist, easier to process
            delete(values.selected_hashtag);

            if (pressed == "all") {
               // render all notes
               render_index_page(response, username, []);
            } else {
               // user wanted specific hashtags, toggle the pressed value
               if (values[pressed] == "true") {
                  values[pressed] = "false";
               } else {
                  values[pressed] = "true";
               }
               
               // find hashtags that have true toggled on
               hts = [];
               for (key in values) {
                  if (values[key] == "true") {
                     hts.push(key);
                  }
               }
               render_index_page(response, username, hts); // , hashtags
            }
         } else {
            // logoutform only option left
            logout(response, session_id);
         }
      } else {
         // no session found
         if ("username" in values) {
            if ("newuserbutton" in values) {
               new_user(response, values["username"], values["pwd"])
            } else {
               // login, create random session_id
               login(response, values["username"], values["pwd"]);
            }
         } else {
            render_login_page(response);
         }
      }
   });
}

// response to http-request
function on_request(request, response) {

   console.log("Connection from: " + request.connection.remoteAddress)
   response.writeHead(200, {"Content-Type": "text/html"}); // , 'Set-Cookie': 'mycookie=test'

   var cookies = parseCookies(request);
   var username = "unknown";

   // get cookies and check if user is logged in
   if ("session_id" in cookies) {

      var session_id = cookies.session_id;
      // refresh cookie
      var expiresattrib = new Date(Date.now() + cookie_ttl*1000 );
      response.writeHead(200, {"Content-Type": "text/html", "Set-Cookie": "session_id=" + session_id + ";expires=" + expiresattrib});

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
                     render_index_page(response, username, []);
                  } else {
                     render_login_page(response);
                  }
               } else if (request.url === "/css/style.css") {
                  return_css(response);
               }
               else {
                  render_404(response);
               }
            } else if (request.method == "POST") {
               // user posted something, prosess the post request
               process_post_request(request, response, session_found, session_id, username);
            }

         });
      });
      db.close()
   } else {
      if (request.method == "POST") {
         process_post_request(request, response, false, "", "");
      } else {
         render_login_page(response);
      }
   }
}

http.createServer(on_request).listen(8000);