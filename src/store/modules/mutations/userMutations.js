import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

export default {
  SET_USER_DATA(state, { token, user: { id, username, roles } }) {
    state.id = id
    state.username = username
    state.roles = roles
    state.token = token

    cookies.set('auth_token', token)
    cookies.set('user_id', id)
    cookies.set('username', username)
    cookies.set('user_roles', JSON.stringify(roles))
  },

  LOGOUT(state) {
    state.id = ''
    state.username = ''
    state.roles = []
    state.token = ''

    cookies.remove('auth_token')
    cookies.remove('user_id')
    cookies.remove('username')
    cookies.remove('user_roles')
  }
}
