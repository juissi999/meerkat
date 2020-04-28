const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

router.post('/', handlers.post)

// SAFE, IDEMPONENT
router.get('/', handlers.getAll)

// SAFE, IDEMPONENT
router.get('/:id', handlers.get)

module.exports = router
