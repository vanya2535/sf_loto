export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    overlay: {
      get() {
        return this.modelValue
      },

      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
