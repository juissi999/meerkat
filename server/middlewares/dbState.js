const mongoose = require('mongoose')

module.exports = (request, response, next) => {
  // mongoose.connection.readyState == 0   not connected
  // mongoose.connection.readyState == 1   connected
  // mongoose.connection.readyState == 2 = connecting
  // mongoose.connection.readyState == 3 = disconnecting

  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    response.status(503).end()
  }
}
