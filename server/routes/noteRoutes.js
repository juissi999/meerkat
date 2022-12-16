const router = require('express').Router()
const handlers = require('../handlers/noteHandlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

// SAFE, IDEMPONENT
/**
 * @swagger
 *  notes/:
 *    get:
 *      tags:
 *        - Notes
 *      summary: Return all notes
 *      description: Return all notes
 *      parameters:
 *        - name: startIndex
 *          in: query
 *        - name: limit
 *          in: query
 *        - name: hashtags
 *          in: query
 */
router.get('/', handlers.getAll)

/**
 * @swagger
 *  notes/count:
 *    get:
 *      tags:
 *        - Notes
 *      summary: Return notes count
 *      description: Return notes count
 *      parameters:
 *        - name: hashtags
 *          in: query
 */
router.get('/count', handlers.getCount)

/**
 * @swagger
 *  notes/hashtags:
 *    get:
 *      tags:
 *        - Notes
 *      summary: Return hashtags
 *      description: Return hashtags
 */
router.get('/hashtags', handlers.getHashtags)

/**
 * @swagger
 *  notes/:
 *    post:
 *      tags:
 *        - Notes
 *      summary: Create a new note
 *      description: Create a new note
 */
router.post('/', handlers.post)

// SAFE, IDEMPONENT
/**
 * @swagger
 *  notes/{noteid}:
 *    get:
 *      tags:
 *        - Notes
 *      summary: Return note by id
 *      description: Return note by id
 */
router.get('/:id', handlers.getOne)

// IDEMPONENT
/**
 * @swagger
 *  notes/{noteid}:
 *    delete:
 *      tags:
 *        - Notes
 *      summary: Delete note by id
 *      description: Delete note by id
 */
router.delete('/:id', handlers.delete)

// IDEMPONENT
/**
 * @swagger
 *  notes/{noteid}:
 *    put:
 *      tags:
 *        - Notes
 *      summary: Update note
 *      description: Update note
 */
router.put('/:id', handlers.put)

module.exports = router
