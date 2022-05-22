<template>
  <div class="overlay" @click="overlay = false">
    <form
      class="overlay__modal"
      @click.stop
      @submit.prevent="refill"
      @keydown.enter="refill"
    >
      <div class="modal__title">Пополнение кошелька</div>

      <div class="modal__body">
        <form-input
          v-model="sum"
          name="refill-sum"
          label="Сумма пополнения"
          inputmode="numeric"
          validation="cost"
        />
      </div>

      <button
        class="modal__submit-button btn btn_graphite btn_block btn_med"
        type="submit"
        :disabled="loading"
      >
        Пополнить кошелек
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import overlay from '@/mixins/overlay'

export default {
  name: 'RefillModal',
  mixins: [overlay],

  data() {
    return {
      sum: 0,
      loading: false
    }
  },

  methods: {
    ...mapActions('user', ['REFILL_WALLET']),

    async refill() {
      if (!this.sum) {
        this.$eventBus.emit('pushMessage', {
          message: 'Введите сумму пополнения'
        })

        return
      }

      try {
        this.loading = true

        await this.REFILL_WALLET(this.sum.replaceAll(' ', ''))

        this.overlay = false

        this.$eventBus.emit('pushMessage', {
          message: 'Кошелек пополнен успешно',
          type: 'success'
        })
      } catch (e) {
        console.error(e.response)
        this.$catchErrors(e?.response)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
