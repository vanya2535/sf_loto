export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    value: {
      get() {
        return this.modelValue
      },

      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
