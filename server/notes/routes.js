const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

// SAFE, IDEMPONENT
router.get('/', handlers.getAll)

router.post('/', handlers.post)

// SAFE, IDEMPONENT
router.get('/:id', handlers.getOne)

// IDEMPONENT
router.delete('/:id', handlers.delete)

// IDEMPONENT
router.put('/:id', handlers.put)

module.exports = router
