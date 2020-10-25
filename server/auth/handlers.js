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

  console.log(user)

  if (true) {
    response.end()
  } else {
    response.status(401).end()
  }
}

exports.deleteUser = (request, response) => {
  const id = request.params.id

  return response.end()
}
