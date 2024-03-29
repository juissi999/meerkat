const router = require('express').Router()
const handlers = require('../handlers/fileHandlers')

// SAFE = action does not change the servers state or database
// IDEMPONENT = effect is the same if you do the action once or n times

/**
 * @swagger
 *  api/files/{noteid}:
 *    post:
 *      tags:
 *        - Files
 *      summary: Post a new file
 *      description: Post a new file
 */
router.post('/:noteid', handlers.addFile)

// SAFE, IDEMPONENT
/**
 * @swagger
 *  api/files/{noteid}:
 *    get:
 *      tags:
 *        - Files
 *      summary: Get files by noteid
 *      description: Get files by noteid
 */
router.get('/:noteid', handlers.getFilesByNoteId)

/**
 * @swagger
 *  api/files/{noteid}/{filename}:
 *    delete:
 *      tags:
 *        - Files
 *      summary: delete file by noteid and filename
 *      description: delete file by noteid and filename
 */
router.delete('/:noteid/:filename', handlers.deleteFile)

module.exports = router
