const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

// IDEMPONENT
router.post('/login', handlers.login)

router.post('/add', handlers.createUser)

router.post('/delete/:id', handlers.deleteUser)

module.exports = router
