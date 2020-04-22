const router = require('express').Router()
const handlers = require('./handlers')

router.post('/', handlers.post)

router.get('/', handlers.getAll)

router.get('/:id', handlers.get)

module.exports = router
