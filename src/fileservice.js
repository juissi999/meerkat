import axios from 'axios'
const baseUrl = '/files'

const post = (filename) => {
  let data = new FormData()
  data.append('memFile', filename)

  axios.post(baseUrl, data)
}

const get = () => {

}

const del = () => {

}

export default {post, get, del}
