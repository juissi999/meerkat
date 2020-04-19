const router = require('express').Router()
const handlers = require('./handlers')

router.post('/', handlers.post)

router.get('/:id', handlers.get)

router.delete('/:id', handlers.delete)

module.exports = router
