const { v4 } = require('uuid')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const rounds = 11

exports.postLogin = (request, response) => {
  const credentials = request.body

  if (!credentials) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }

  //User.find({}).then((result) => console.log('user', result))

  const passwd = request.body.passwd
  const email = request.body.email

  User.findOne({ email }, (err, user) => {
    console.log(user)

    if (user === null) {
      return response.status(401).send('Unauthorized')
    }

    bcrypt.compare(passwd, user.passwordHash, function (err2, match) {
      if (err2) {
        // Hash comparison failed. Password might still be correct, though.
        console.log(err2)
        return response.status(401).send('Unauthorized')
      }

      if (!match) {
        // no password match => Authentication failure
        return response.status(401).send('Unauthorized')
      }

      const token = 'testtoken'
      response.json({ token })
    })
  })
}

exports.postUser = (request, response) => {
  const passwd = request.body.passwd
  const email = request.body.email

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
