import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

export default {
  SET_USER_DATA(state, { token, user: { id, username, roles, balance } }) {
    state.id = id
    state.username = username
    state.roles = roles
    state.balance = balance
    state.token = token

    cookies.set('auth_token', token)
  },

  LOGOUT(state) {
    state.id = ''
    state.username = ''
    state.roles = []
    state.balance = null
    state.token = ''

    cookies.remove('auth_token')
  },

  UPDATE_BALANCE(state, { balance }) {
    state.balance = balance
  }
}
