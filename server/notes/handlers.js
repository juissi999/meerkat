const { v4: uuidv4 } = require('uuid')

const Note = require('../models/note')
const File = require('../models/file')

const htutils = require('../hashtagUtils')

exports.getAll = (request, response) => {
  const { startIndex, limit, hashtags } = request.query

  // query string doesnt contain #-signs, add them
  if (hashtags) {
    const hashtagArray = hashtags.split(',').map((ht) => `#${ht}`)
  }

  Note.find({})
    .sort({ date: 'desc' })
    .skip(parseInt(startIndex))
    .limit(parseInt(limit))
    .then((notes) => {
      response.json(notes)
    })
    .catch((err) => {
      response.status(400).end()
      console.log(err.message)
    })
}

exports.getCount = (request, response) => {
  Note.find({}).countDocuments((err, count) => response.send(count.toString()))
}

exports.getHashtags = (request, response) => {
  Note.find({})
    .then((notes) => {
      const hashtags = notes.reduce((acc, cur) => acc.concat(cur.hashtags), [])
      response.json(hashtags)
    })
    .catch((err) => {
      response.status(400).end()
      console.log(err.message)
    })
}

exports.getOne = (request, response) => {
  Note.findOne({ noteid: request.params.id })
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      console.log(err.message)
      response.status(400).end()
    })
}

exports.post = (request, response) => {
  const posttime = Date.now()
  const noteid = uuidv4()
  const noteText = request.body.text

  if (!noteText) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }

  const hashtags = htutils.findHashtagsFromString(noteText)

  const note = new Note({
    text: noteText,
    noteid: noteid,
    date: posttime,
    hashtags: hashtags
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => {
      response.status(409).end()
      return console.log(err)
    })
}

exports.delete = (request, response) => {
  const id = request.params.id

  Note.deleteOne({ noteid: id })
    .then(() => {
      return File.deleteMany({ noteid: id })
    })
    .then(() => {
      // note and possible files deleted, all ok
      response.status(204).end()
    })
    .catch((err) => {
      response.status(409).end()
      return console.log(err)
    })
}

exports.put = (request, response) => {
  const id = request.params.id
  const notestr = request.body.text
  // const posttime = Date.now()

  const filter = { noteid: id }
  const update = { text: notestr }

  Note.updateOne(filter, update)
    .then((updated) => {
      // console.log(updated)
      response.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      response.status(409).end()
    })
}
