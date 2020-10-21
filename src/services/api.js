import axios from 'axios'

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: '',
  Authorization: token ? `Bearer ${token}` : ''
})

export default api
