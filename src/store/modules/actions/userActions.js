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
  },

  async GET_USER_DATA({ commit }, token) {
    try {
      const { data } = await axios.get(`/auth/data?token=${token}`)

      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async REFILL_WALLET({ commit }, sum) {
    try {
      const { data } = await axios.post('/wallet/refill', {
        sum
      })

      commit('UPDATE_BALANCE', data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async PAY_FROM_WALLET({ commit }, sum) {
    try {
      const { data } = await axios.post('/wallet/pay', {
        sum
      })

      commit('UPDATE_BALANCE', data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
