import { createStore } from 'vuex'
import user from './modules/user'
import message from './modules/message'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: {
      namespaced: true,
      ...user
    },

    message: {
      namespaced: true,
      ...message
    }
  }
})
