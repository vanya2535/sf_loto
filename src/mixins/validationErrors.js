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
    }
  }
}
