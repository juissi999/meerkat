const router = require('express').Router()
const handlers = require('../handlers/fileHandlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

/**
 * @swagger
 *  files/:
 *    post:
 *      tags:
 *        - Files
 *      summary: Post a new file
 *      description: Post a new file
 */
router.post('/', handlers.post)

// SAFE, IDEMPONENT
/**
 * @swagger
 *  files/{noteid}:
 *    get:
 *      tags:
 *        - Files
 *      summary: Get files by noteid
 *      description: Get files by noteid
 */
router.get('/:noteid', handlers.getFilesByNoteId)

/**
 * @swagger
 *  files/{noteid}/{filename}:
 *    delete:
 *      tags:
 *        - Files
 *      summary: delete file by noteid and filename
 *      description: delete file by noteid and filename
 */
router.delete('/:noteid/:filename', handlers.delete)

module.exports = router
