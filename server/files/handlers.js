const multer = require('multer')
const path = require('path')
const fs = require('fs')
const status = require('http-status-codes')
const dbservice = require('../dbservice')

// use webpack config file to get build directory
const wpconf = require('../../webpack.config')
const builddir = wpconf.output.path

const MAXSIZE = 5000000
const UPLOADDIR = 'uploads/'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {

    // check if upload directory exists and if not, create it
    const uploadpath = path.resolve(builddir, UPLOADDIR)
    if (!fs.existsSync(uploadpath)) {
      fs.mkdirSync(uploadpath, { recursive: true })
    }

    cb(null, uploadpath)
  },
  filename: function(req, file, cb) {
    const timestamp = Math.round((new Date()).getTime() / 1000)
    cb(null, timestamp.toString() + '_' + file.originalname)
  }
})

exports.get = (request, response) => {
}

exports.post = (request, response) => {

  const opts = {
    storage:storage,
    limits:{
      fileSize:MAXSIZE
    }
  }

  const upload = multer(opts).single('memFile')

  upload(request, response, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return response.sendStatus(status.REQUEST_TOO_LONG)
      }
      return response.status(status.BAD_REQUEST)
    }
    // add to database linker information
    const fname = request.file.filename
    const noteid = request.body.noteid
    dbservice.postFile(noteid, fname, (err) => {
      if (err) {
        console.log(err)
        return response.status(status.CONFLICT)
      }
      response.json({filename:fname,
                      noteid:noteid,
                      uploaddir:UPLOADDIR})
      response.status(200).end()
    })
  })
}

exports.delete = (request, response) => {
}

exports.getAll = (request, response) => {
  dbservice.getAllFiles((err, files) => {
    if (err) {
      return console.log(err)
    }
    response.json(files)
    })
}
