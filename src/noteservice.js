import axios from 'axios'
const baseUrl = '/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = (newentry) => {
  const request = axios.post(baseUrl, newentry)
  return request.then((response) => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => {
    return response.data
  }) 
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {getAll, post, del, update}
