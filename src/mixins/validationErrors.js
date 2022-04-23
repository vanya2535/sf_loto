export default {
  data() {
    return {
      validationErrors: {}
    }
  },

  computed: {
    hasErrors() {
      return !!Object.values(this.validationErrors).length
    }
  },

  methods: {
    resetErrors(...fields) {
      for (let field of fields) {
        delete this.validationErrors[field]
      }
    },

    getError(field) {
      return this.validationErrors[field] || ''
    },

    setError(field, error) {
      this.validationErrors[field] = error
    },

    catchErrors(response) {
      if (response?.data) {
        if (response.data.message) {
          this.$eventBus.emit('pushMessage', {
            message: response.data.message,
            type: 'error'
          })
        } else if (response.data.errors) {
          for (let error of response.data.errors) {
            this.setError(error.param, error.msg)
          }
        }
      }
    }
  }
}
