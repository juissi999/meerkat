import axios from 'axios'
const baseUrl = '/notes'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const post = (newentry) => {
  const promise = axios.post(baseUrl, newentry)
  return promise.then((response) => response.data)
}

const del = (id) => {
  const promise = axios.delete(`${baseUrl}/${id}`)
  return promise.then((response) => {
    return response.data
  }) 
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {getAll, post, del, update}
