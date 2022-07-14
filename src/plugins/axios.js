import Axios from 'axios'
import store from '@/store'

Axios.defaults.baseURL = 'https://sf-loto.herokuapp.com/'
if (process.env.NODE_ENV === 'development') {
  Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
}

Axios.interceptors.request.use((config) => {
  const token = store.state.user.token

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export default Axios

export const axios = {
  install: (app, options) => {
    app.config.globalProperties.$axios = Axios
  }
}
