# meerkat
A quick on the go web app for making notes.

### meerkat?

A quick animal who probably forgots a lot quickly too. Also meerkat resembles the word "memory" a bit and the purpose of this app is to be a help for memory.

### Features

Store memos by writing a note. Add file to note if you want. Add hashtags to note. Filter notes in the database by using hashtags inside notes. Edit or delete existing notes.

### Demo

Deploys on Heroku with cloud DB. Check: http://meerk4t.herokuapp.com/.

### Usage

#### Application

Start a command line and go to the app directory.

Download by typing:

`git clone https://github.com/juissi999/meerkat.git`

Install dependencies by typing:

`npm install`

Build front-end by typing:

`npm run build`

Start server by typing:

`npm run start`

The server will listen on port 80 by default. Specify port on .env-file: PORT.

Connect your mongoDB-database by specifying URL on .env-file: MONGODB_URI.

#### Database

If you use local mongodb, download mongodb, specify and create folder for database.
Start mongod instance on your machine.

*On Windows*, replace version and path with your system specific an type:

`"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe"`

*On Linux*, type:

`mongod`

*On Cloud*, check the specific cloud manual.

### Technologies used

* html
* CSS
* JavaScript
* Single Page App design
* React.js
* React bootstrap
* REST API
* Node.js
* Webpack
* File upload with forms and multer
* npm
* dotenv
* Mongoose (MongoDB)
