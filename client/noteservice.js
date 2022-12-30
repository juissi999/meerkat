import axios from 'axios'
const baseUrl = '/api/notes'

const generateHashtagQuery = (hashtags, startChar) => {
  // trim hashtags to work on a query (no # allowed, special meaning)
  const hashtagStr = hashtags.map((ht) => encodeURIComponent(ht)).join(',')

  // construct hashtag query str
  const query =
    hashtags.length === 0 ? '' : `${startChar}hashtags=${hashtagStr}`

  return query
}

const getNotes = async (pagination, hashtags, hashtagMode) => {
  const { startIndex, limit } = pagination

  const hashtagQuery = generateHashtagQuery(hashtags, '&')

  const response = await axios.get(
    `${baseUrl}?startIndex=${startIndex}&limit=${limit}&hashtagMode=${hashtagMode}${hashtagQuery}`
  )
  return response.data
}

const getCount = async (hashtags, hashtagMode) => {
  const hashtagQuery = generateHashtagQuery(hashtags, '&')

  const response = await axios.get(
    `${baseUrl}/count?hashtagMode=${hashtagMode}${hashtagQuery}`
  )
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
