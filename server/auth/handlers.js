exports.post = (request, response) => {
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
