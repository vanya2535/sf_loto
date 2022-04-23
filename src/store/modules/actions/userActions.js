import axios from '@/plugins/axios'

export default {
  async REGISTER({ commit }, { username, password, role }) {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
        role
      })

      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async LOGIN({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password
      })

      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
