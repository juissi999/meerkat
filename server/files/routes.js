const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

router.post('/', handlers.post)

// SAFE, IDEMPONENT
router.get('/', handlers.getAll)

// SAFE, IDEMPONENT
router.get('/:noteid', handlers.getFiles)

router.delete('/:noteid/:filename', handlers.delete)

module.exports = router
