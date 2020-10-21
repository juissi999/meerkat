exports.post = (request, response) => {
  const credentials = request.body
  console.log(credentials)

  if (!credentials) {
    return response.status(400).json({
      error: 'Content missing.'
    })
  }

  const token = 'testtoken'

  if (true) {
    response.json({ token })
  } else {
    response.status(401).end()
  }
}
