const jwt = require('jsonwebtoken')

module.exports = function (options) {
  return function (request, response, next) {
    // process.env.SECRET
    const SECRET = options.SECRET

    let userId = null
    const token = extractToken(request.headers.authorization)
    if (token) {
      const id = extractUserId(token, SECRET)
      if (!id) {
        return response.status(400).end()
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
