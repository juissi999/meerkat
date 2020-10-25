const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  id: String,
  passwordhash: String
})

module.exports = mongoose.model('User', userSchema)
