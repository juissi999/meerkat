const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  filename: String,
  noteid: String,
  ownerId: String
})

module.exports = mongoose.model('File', fileSchema)
