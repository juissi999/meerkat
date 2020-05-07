const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  filename: String,
  noteid: String
})

module.exports = mongoose.model('File', fileSchema)
