import axios from 'axios'

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: '',
  headers: { Authorization: token ? `Bearer ${token}` : '' }
})

export default api
