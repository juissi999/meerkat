import axios from 'axios'
const baseUrl = '/files'

const post = (filename, noteid) => {
  const data = new FormData()
  data.append('noteid', noteid)
  data.append('memFile', filename)

  const request = axios.post(baseUrl, data)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const get = () => {}

const del = (filename) => {
  const request = axios.delete(`${baseUrl}/${filename}`)
  return request.then((response) => response.data)
}

export default { post, get, del, getAll }
