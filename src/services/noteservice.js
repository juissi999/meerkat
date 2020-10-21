import api from './api'
const baseUrl = '/notes'

const getAll = () => {
  const request = api.get(baseUrl)
  return request.then((response) => response.data)
}

const getOne = (id) => {
  const request = api.get(`${baseUrl}/${id}`)
  return request.then((response) => {
    return response.data
  })
}

const post = (newentry) => {
  const request = api.post(baseUrl, newentry)
  return request.then((response) => response.data)
}

const del = (id) => {
  const request = api.delete(`${baseUrl}/${id}`)
  return request.then((response) => {
    return response.data
  })
}

const update = (id, newObject) => {
  const request = api.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default { getAll, getOne, post, del, update }
