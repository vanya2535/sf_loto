<template>
  <div class="overlay" @click="overlay = false">
    <div class="overlay__modal" @click.stop>
      <div class="modal__title">Победные билеты</div>

      <div class="modal__body">
        <div class="tickets">
          <div
            v-for="ticket of lottery.winningTickets"
            :key="ticket.number"
            class="ticket"
          >
            <div class="ticket__number">
              {{ ticket.number }}
            </div>

            <div class="ticket__prize">{{ $costMask(ticket.prize) }} ₽</div>
          </div>
        </div>

        <template v-if="isUserLotteryVisible">
          <p class="modal__title">Ваши билеты</p>

          <div class="tickets">
            <div
              v-for="ticket of userLottery.tickets"
              :key="ticket.number"
              class="ticket"
            >
              <div class="ticket__number">
                {{ ticket }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="modal__attemption">
        Если среди ваших билетов есть выигрышные, мы вскоре свяжемся с вами
      </div>

      <button
        class="modal__submit-button btn btn_graphite btn_block btn_med"
        type="submit"
        @click="overlay = false"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
import overlay from '@/mixins/overlay'

export default {
  name: 'ResultsModal',
  mixins: [overlay],

  props: {
    lottery: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      userLottery: null
    }
  },

  computed: {
    isUserLotteryVisible() {
      return !!this.userLottery?.tickets.length
    }
  },

  async created() {
    try {
      const { data } = await this.$axios.get(
        `/user-lottery/${this.lottery.serial}`
      )
      this.userLottery = data
    } catch (e) {
      console.log(e)
      this.$catchErrors(e?.response)
    }
  }
}
</script>

<style lang="scss" scoped>
.tickets {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 12px;

  .ticket {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__number {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid $gold;
      border-radius: 10px;
      border-top-right-radius: 14px;
      width: 32px;
      height: 32px;
      font-weight: 700;
      font-size: 14px;
      color: $dark;

      &::after {
        content: '';
        position: absolute;
        left: 150%;
        top: 50%;
        width: 8px;
        height: 200%;
        background: $gold;
        filter: blur(10px);
        transform: translate(-50%, -50%) rotate(45deg);
        will-change: left;
      }

      &:hover {
        @media (min-width: 1024px) {
          box-shadow: 1px 1px 10px $shadow;
          color: $primary;
          transform: scale(1.1);
        }
      }
    }

    &__prize {
      margin-top: 0;
      font-size: 12px;
      color: $graphite;
    }
  }
}

@media (max-width: 767px) {
  .tickets {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 425px) {
  .tickets {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
