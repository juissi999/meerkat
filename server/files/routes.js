const router = require('express').Router()
const handlers = require('./handlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

/**
 * @swagger
 *  files/:
 *    post:
 *      description: Post a new file
 *      tags:
 *        - Files
 */
router.post('/', handlers.post)

// SAFE, IDEMPONENT
/**
 * @swagger
 *  files/:noteid:
 *    get:
 *      description: Get files by noteid
 *      tags:
 *        - Files
 */
router.get('/:noteid', handlers.getFilesByNoteId)

/**
 * @swagger
 *  files/:noteid/:filename:
 *    delete:
 *      description: delete file by noteid and filename
 *      tags:
 *        - Files
 */
router.delete('/:noteid/:filename', handlers.delete)

module.exports = router
