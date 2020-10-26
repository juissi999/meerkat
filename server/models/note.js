const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  text: String,
  date: Date,
  noteid: String,
  ownerId: String
})

module.exports = mongoose.model('Note', noteSchema)
