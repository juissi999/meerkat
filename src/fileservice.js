import axios from 'axios'
const baseUrl = '/files'

const post = (filename, noteid) => {
  let data = new FormData()
  data.append('noteid', noteid)
  data.append('memFile', filename)

  const request = axios.post(baseUrl, data)
  return request.then(response => response.data)
}

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const get = () => {

}

const del = () => {

}

export default {post, get, del, getAll}
