<template>
  <div
    v-show="message.length"
    ref="message"
    class="message"
    :class="`message_${type}`"
  >
    {{ message }}
  </div>
</template>

<script>
let messageTimeout

export default {
  name: 'FloatingMessage',

  data() {
    return {
      message: '',
      type: 'error'
    }
  },

  created() {
    this.$eventBus.on('pushMessage', ({ message, type }) => {
      this.message = ''
      this.type = type || 'error'

      this.$nextTick(() => {
        this.message = message
      })

      clearTimeout(messageTimeout)

      messageTimeout = setTimeout(() => {
        this.message = ''
      }, 4000)
    })
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 4;
  border-radius: 10px;
  padding: 12px 14px;
  max-width: 75vw;
  box-shadow: 1px 1px 6px $gray-light;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: $primary;
  background: $white;
  animation: slide-down 0.3s;
  cursor: auto;
  pointer-events: none;

  &_error {
    border: 2px solid $red;
  }

  &_success {
    border: 2px solid $green;
  }
}

@keyframes slide-down {
  from {
    top: -200px;
  }

  to {
    top: 10px;
  }
}

@media (max-width: 768px) {
  .message {
    font-size: 14px;
  }
}

@media (max-width: 425px) {
  .message {
    padding: 8px 10px;
  }
}
</style>
