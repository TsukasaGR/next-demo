import axiosBase from 'axios'

const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

axios.defaults.withCredentials = true

export default axios
