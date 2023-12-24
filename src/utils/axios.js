import Axios from 'axios'

export const axios = Axios.create({
    baseURL: "http://localhost:4400/api/v1",
    withCredentials:true
})