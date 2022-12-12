import axios from 'axios'
const baseUrl = '/notes'

const getNotes = async (pagination, hashtags) => {
  const { startIndex, limit } = pagination

  // trim hashtags to work on a query (no # allowed, special meaning)
  const hashtagStr = hashtags.map((ht) => ht.slice(1)).join(',')

  // construct hashtag query str
  const hashtagQuery = hashtags.length === 0 ? '' : `&hashtags=${hashtagStr}`

  const response = await axios.get(
    `${baseUrl}?startIndex=${startIndex}&limit=${limit}${hashtagQuery}`
  )
  return response.data
}

const getCount = async () => {
  const response = await axios.get(`${baseUrl}/count`)
  return response.data
}

const getHashtags = async () => {
  const response = await axios.get(`${baseUrl}/hashtags`)
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

export default { getNotes, getCount, getHashtags, getOne, post, del, update }
