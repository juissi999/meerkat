const Note = require('../models/note')
const File = require('../models/file')

exports.getAll = (request, response) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
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
  const noteid = Math.floor(Math.random() * 1000000000)
  const txt = request.body.text

  if (!txt) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }

  const note = new Note({
    text: request.body.text,
    noteid: noteid,
    date: posttime
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
  const id = Number(request.params.id)

  Note.deleteOne({ noteid: id })
    .then(() => {
      return File.deleteOne({ noteid: id })
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
  const id = Number(request.params.id)
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
