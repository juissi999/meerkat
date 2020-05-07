const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  text: String,
  date: Date,
  noteid: String
})

module.exports = mongoose.model('Note', noteSchema)
