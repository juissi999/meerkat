const { v4 } = require('uuid')
const bcrypt = require('bcryptjs')

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
  const passwd = request.body.passwd
  const email = request.body.email
  const rounds = 11

  bcrypt.hash(passwd, rounds, (berr, pwdHash) => {
    if (berr) {
      console.log(berr)
      return response.status(409).end()
    }

    // TODO what if conflict?
    const userId = v4()

    const user = new User({
      email: email,
      id: userId,
      passwordHash: pwdHash
    })

    console.log('user', user)

    user
      .save()
      .then((result) => {
        console.log('User created: ' + email) // DEBUG
        return response.json(result)
      })
      .catch((err) => {
        response.status(409).end()
        return console.log(err)
      })
  })
}

exports.deleteUser = (request, response) => {
  const id = request.params.id

  return response.end()
}
