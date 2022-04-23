import actions from './actions/userActions'
import mutations from './mutations/userMutations'
import getters from './getters/userGetters'

export default {
  state: () => ({
    id: '',
    username: '',
    roles: [],
    token: ''
  }),

  actions,
  mutations,
  getters
}
