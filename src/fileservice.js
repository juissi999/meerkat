import axios from 'axios'
const baseUrl = '/files'

const post = (filename) => {
  let data = new FormData()
  data.append('memFile', filename)

  const request = axios.post(baseUrl, data)
  return request.then(response => response.data)
}

const get = () => {

}

const del = () => {

}

export default {post, get, del}
