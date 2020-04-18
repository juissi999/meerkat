const router = require('express').Router()
const handlers = require('./handlers')

router.get('/', handlers.getAll)

router.post('/', handlers.post)

router.delete('/:id', handlers.delete)

router.put('/:id', handlers.put)

module.exports = router
