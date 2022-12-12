const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  text: String,
  date: Date,
  noteid: String,
  hashtags: [String]
})

module.exports = mongoose.model('Note', noteSchema)
