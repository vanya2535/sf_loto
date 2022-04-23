export default {
  GET_USER_USERNAME(state) {
    return state.username
  },

  GET_USER_ROLES(state) {
    return state.roles
  },

  GET_USER_AUTH_TOKEN(state) {
    return state.token
  },

  IS_AUTHORIZED(state) {
    return !!state.token
  }
}
