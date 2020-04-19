const multer = require('multer')
const path = require('path')
const fs = require('fs')
const dbservice = require('../dbservice')

// use webpack config file to get build directory
const wpconf = require('../../webpack.config')
const builddir = wpconf.output.path

const storage = multer.diskStorage({
  destination: function(req, file, cb) {

    // check if upload directory exists and if not, create it
    const uploadpath = path.resolve(builddir, 'uploads/')
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

  const upload = multer({storage:storage}).single('memFile')

  upload(request, response, (err)=> {
    if (err) {
      return response.status(status.BAD_REQUEST)
    } 
    response.status(200).end()
  })
}

exports.delete = (request, response) => {
}
