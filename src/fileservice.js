import axios from 'axios'
const baseUrl = '/files'

const post = async (filename, noteid) => {
  const data = new FormData()
  data.append('noteid', noteid)
  data.append('memFile', filename)

  const response = await axios.post(baseUrl, data)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = () => {}

const del = async (filename) => {
  const response = await axios.delete(`${baseUrl}/${filename}`)
  return response.data
}

export default { post, get, del, getAll }
