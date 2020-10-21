import axios from 'axios'
const baseUrl = '/user'

const login = (credentials) => {
  const request = axios.post('/auth/login', credentials)
  return request.then((response) => response.data)
}

const newUser = (newentry) => {
  const request = axios.post(baseUrl, newentry)
  return request.then((response) => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => {
    return response.data
  })
}

export default { login, newUser, del }
