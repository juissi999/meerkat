const jwt = require('jsonwebtoken')

// a middleware that extracts the token and checks if it's valid. Adds an userId
// field to request object. userId is null if no token is present. If token was
// not valid, response with 401.

// Parameters: options {SECRET: string[jwt token secret]}

module.exports = function (options) {
  return function (request, response, next) {
    // process.env.SECRET
    const SECRET = options.SECRET

    let userId = null
    const token = extractToken(request.headers.authorization)
    if (token) {
      const id = extractUserId(token, SECRET)
      if (!id) {
        return response.status(401).end()
      }
      userId = id
    }
    request.userId = userId
    next()
  }
}

const extractToken = (tokenString) => {
  if (!tokenString) {
    return null
  }
  tokenArray = tokenString.split(' ')

  if (tokenArray[0] === 'Bearer' && tokenArray.length === 2) {
    return tokenArray[1]
  }
}

const extractUserId = (token, SECRET) => {
  try {
    const decoded = jwt.verify(token, SECRET)
    return decoded.id
  } catch (error) {
    console.log(error)
    return null
  }
}
