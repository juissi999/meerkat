const { v4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const rounds = 11

exports.login = (request, response) => {
  const credentials = request.body

  if (!credentials) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }

  //User.find({}).then((result) => console.log('user', result))

  const passwd = request.body.passwd
  const email = request.body.email

  User.findOne({ email })
    .then((user) => {
      if (user === null) {
        throw new Error('User doesnt exist.')
      }

      bcrypt
        .compare(passwd, user.passwordHash)
        .then((match) => {
          if (!match) {
            // no password match => Authentication failure
            throw new Error('Wrong password.')
          }

          const tokenPayload = {
            email: user.email,
            id: user.id
          }

          const tokenOptions = {
            expiresIn: '1h' // '60d' is two months,
          }

          const token = jwt.sign(tokenPayload, process.env.SECRET, tokenOptions)
          console.log(user.email + ' logged in.')

          response.json({ token })
        })
        .catch((err) => {
          console.log(err)
          return response.status(401).send('Unauthorized')
        })
    })
    .catch((err) => {
      console.log(err)
      return response.status(401).send('Unauthorized')
    })
}

exports.createUser = (request, response) => {
  const passwd = request.body.passwd
  const email = request.body.email

  // check user with this email does not exist
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error('Email in use.')
      }

      // create password hash
      return bcrypt.hash(passwd, rounds)
    })
    .then((pwdHash) => {
      const userId = v4()

      const user = new User({
        email: email,
        id: userId,
        passwordHash: pwdHash
      })

      // save user details to database
      return user.save()
    })
    .then((result) => {
      console.log('User created: ' + email) // DEBUG
      return response.json(result)
    })
    .catch((err) => {
      console.log(err)
      return response.status(400).end()
    })
}

exports.deleteUser = (request, response) => {
  const id = request.params.id

  return response.end()
}
