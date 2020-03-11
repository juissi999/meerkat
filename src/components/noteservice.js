import axios from 'axios'
const baseUrl = '/notes'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const post = (newentry) => {
  const promise = axios.post(baseUrl, newentry)
  return promise.then((response)=> response.data)
}


export default {getAll, post}