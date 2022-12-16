import axios from 'axios'
const baseUrl = '/api/files'

const post = async (filename, noteid) => {
  const data = new FormData()
  data.append('memFile', filename)

  const response = await axios.post(`${baseUrl}/${noteid}`, data)
  return response.data
}

const getNotesFiles = async (noteid) => {
  const response = await axios.get(`${baseUrl}/${noteid}`)
  return response.data
}

const deleteFile = async (noteid, filename) => {
  const response = await axios.delete(`${baseUrl}/${noteid}/${filename}`)
  return response.data
}

export default { post, deleteFile, getNotesFiles }
