const { v4 } = require('uuid')

const User = require('../models/user')

exports.postLogin = (request, response) => {
  const credentials = request.body

  if (!credentials) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }

  const { email, passwd } = credentials

  User.find({ email, passwd })
    .then((auth) => {
      console.log(auth)
      response.json(auth)
    })
    .catch((err) => {
      console.log(err.message)
      response.status(401).end()
    })

  let valid = false
  if (email === 'test@test.com') {
    valid = true
  }

  if (valid) {
    const token = 'testtoken'
    response.json({ token })
  } else {
    response.status(401).end()
  }
}

exports.postUser = (request, response) => {
  const user = new User({
    email: request.body.email,
    id: v4(),
    passwordHash: request.body.passwd
  })

  user
    .save()
    .then((savedUser) => {
      console.log('created user:', savedUser)
      response.json(savedUser)
    })
    .catch((err) => {
      response.status(409).end()
      return console.log(err)
    })
}

exports.deleteUser = (request, response) => {
  const id = request.params.id

  return response.end()
}
