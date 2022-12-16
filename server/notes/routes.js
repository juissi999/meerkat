const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

// SAFE, IDEMPONENT
/**
 * @swagger
 *  notes/:
 *    get:
 *      description: Return all notes
 *      tags:
 *        - Notes
 */
router.get('/', handlers.getAll)

/**
 * @swagger
 *  notes/count:
 *    get:
 *      description: Return notes count
 *      tags:
 *        - Notes
 */
router.get('/count', handlers.getCount)

/**
 * @swagger
 *  notes/hashtags:
 *    get:
 *      description: Return hashtags
 *      tags:
 *        - Notes
 */
router.get('/hashtags', handlers.getHashtags)

/**
 * @swagger
 *  notes/:
 *    post:
 *      description: Create a new note
 *      tags:
 *        - Notes
 */
router.post('/', handlers.post)

// SAFE, IDEMPONENT
/**
 * @swagger
 *  notes/:noteid:
 *    get:
 *      description: Return note by id
 *      tags:
 *        - Notes
 */
router.get('/:id', handlers.getOne)

// IDEMPONENT
/**
 * @swagger
 *  notes/:noteid:
 *    delete:
 *      description: Delete note by id
 *      tags:
 *        - Notes
 */
router.delete('/:id', handlers.delete)

// IDEMPONENT
/**
 * @swagger
 *  notes/:noteid:
 *    put:
 *      description: Update note
 *      tags:
 *        - Notes
 */
router.put('/:id', handlers.put)

module.exports = router
