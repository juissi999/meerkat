// a node.js webserver without any frameworks
// run: "node ./server"

var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
//var sqlite = require("sqlite3").verbose();

db = [];
var indstr = fs.readFileSync("index.ejs", "utf-8");

// response to http-request
function on_request(request, response) {

   response.writeHead(200, {"Content-Type": "text/html"});
   if (request.method == "GET") {
      // send the user index page
      if (request.url == "/") {
         // if the user wants index page
         fs.readFile("./index.ejs", null, function(error,data) {
            if (error) {
               response.writeHead("404");
               response.write("File not found!")
            } else {
               response.write(ejs.render(indstr, {"notes":db}));
            }
            response.end();
         })
         } else {
            response.writeHead("404");
            response.write("File not found!");
            response.end();
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
            db.push(a[1]);
         }
         response.write(ejs.render(indstr, {"notes":db}));
         response.end();
     });
   }
}



http.createServer(on_request).listen(8000);