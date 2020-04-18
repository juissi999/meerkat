const router = require('express').Router()
const multer = require('multer')
const handlers = require('./handlers')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'server/db/uploads/')
  },
  filename: function(req, file, cb) {
    const timestamp = Math.round((new Date()).getTime() / 1000)
    cb(null, timestamp + file.originalname)
  }
})

const upload = multer({storage:storage})

router.post('/', upload.single('memFile'), handlers.post)

router.get('/:id', handlers.get)

router.delete('/:id', handlers.delete)

module.exports = router
