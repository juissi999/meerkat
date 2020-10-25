import axios from 'axios'
const baseUrl = '/auth'

const login = (credentials) => {
  const request = axios.post('/login', credentials)
  return request.then((response) => response.data)
}

const newUser = (newentry) => {
  const request = axios.post(`${baseUrl}/add`, newentry)
  return request.then((response) => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/delete/${id}`)
  return request.then((response) => {
    return response.data
  })
}

export default { login, newUser, del }
