const multer = require('multer')
const path = require('path')
const fs = require('fs')
const File = require('../models/file')

// use webpack config file to get build directory
const wpconf = require('../../webpack.config')
const builddir = wpconf.output.path

const MAX_UPLOAD_SIZE = Number(process.env.MAX_UPLOAD_FILE_SIZE) || 5000000
const UPLOADDIR = 'uploads/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // check if upload directory exists and if not, create it
    const noteId = req.params.noteid
    const uploadpath = path.resolve(builddir, UPLOADDIR, noteId)
    if (!fs.existsSync(uploadpath)) {
      fs.mkdirSync(uploadpath, { recursive: true })
    }

    cb(null, uploadpath)
  },
  filename: (req, file, cb) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    cb(null, file.originalname)
  }
})

exports.getFilesByNoteId = (request, response) => {
  File.find({ noteid: request.params.noteid })
    .then((files) => {
      response.json(files)
    })
    .catch((err) => {
      console.log(err.message)
      response.status(400).end()
    })
}

exports.addFile = (request, response) => {
  const opts = {
    storage: storage,
    limits: {
      fileSize: MAX_UPLOAD_SIZE
    }
  }

  const upload = multer(opts).single('memFile')

  upload(request, response, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return response.status(400).send({ error: 'File too big.' })
      }
      return response.status(400).end()
    }

    // add to database linker information
    const fname = request.file.filename
    const noteid = request.params.noteid

    const file = new File({
      noteid: noteid,
      filename: fname
    })

    file
      .save()
      .then(() => {
        response.json({
          filename: fname,
          noteid: noteid,
          uploaddir: UPLOADDIR
        })
        response.status(200).end()
      })
      .catch((err) => {
        console.log(err)
        response.status(400).end()
      })
  })
}

exports.deleteFile = (request, response) => {
  const id = Number(request.params.noteid)
  const filename = request.params.filename

  File.deleteOne({ noteid: id, filename: filename })
    .then(() => {
      // file deleted, all ok
      response.status(204).end()
    })
    .catch((err) => {
      response.status(409).end()
      return console.log(err)
    })
}
