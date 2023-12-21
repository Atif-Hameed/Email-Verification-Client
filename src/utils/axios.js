import axios from 'axios'
axios.defaults.baseURL = "http://locahost:4400/api/v1"
axios.defaults.withCredentials = true

export { axios }