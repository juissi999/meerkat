import axios from 'axios'
const baseUrl = '/notes'

const getAll = async (pagination) => {
  const { startIndex, limit } = pagination
  const response = await axios.get(
    `${baseUrl}?startIndex=${startIndex}&limit=${limit} }`
  )
  return response.data
}

const getCount = async () => {
  const response = await axios.get(`${baseUrl}/count`)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const post = async (newentry) => {
  const response = await axios.post(baseUrl, newentry)
  return response.data
}

const del = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, getCount, getOne, post, del, update }
