const router = require('express').Router()
const multer = require('multer')
const handlers = require('./handlers')
const path = require('path')
const fs = require('fs')

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

const upload = multer({storage:storage})

router.post('/', upload.single('memFile'), handlers.post)

router.get('/:id', handlers.get)

router.delete('/:id', handlers.delete)

module.exports = router
