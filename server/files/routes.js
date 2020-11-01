const router = require('express').Router()
const handlers = require('./handlers')
const tokenValidator = require('../tokenValidator')

// add tokenValidator middleware that validates JWT token and adds a userId
// field to request
router.use(tokenValidator({ SECRET: process.env.SECRET }))

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

router.post('/', handlers.post)

// SAFE, IDEMPONENT
router.get('/', handlers.getAll)

// SAFE, IDEMPONENT
router.get('/:id', handlers.get)

module.exports = router
