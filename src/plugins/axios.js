import Axios from 'axios'
import store from '@/store'

if (process.env.NODE_ENV === 'development') {
  Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
}

Axios.interceptors.request.use((config) => {
  const token = store.state.user.token

  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default Axios
