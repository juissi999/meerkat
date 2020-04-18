
const dbservice = require('../dbservice')

exports.get = (request, response) => {
}

exports.post = (request, response) => {
  console.log(request.file)
  response.status(200).end()
}

exports.delete = (request, response) => {
}
