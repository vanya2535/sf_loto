<template>
  <div class="overlay" @click="overlay = false">
    <div class="overlay__modal" @click.stop>
      <div class="modal__title">Доступные билеты</div>

      <div class="modal__body" :class="{ modal__body_disabled: loading }">
        <div class="tickets">
          <button
            v-for="ticket of tickets"
            :key="ticket"
            class="ticket"
            :class="{
              ticket_selected:
                selectedTickets.includes(ticket) &&
                !lottery.ownedTickets.includes(ticket)
            }"
            :disabled="lottery.ownedTickets.includes(ticket)"
            @click="selectTicket(ticket)"
          >
            {{ ticket }}
          </button>
        </div>
      </div>

      <p class="modal__attemption">
        С вашего счета будет списано <br />
        {{ $costMask(selectedTicketsCost) }} ₽
      </p>

      <button
        class="modal__submit-button btn btn_graphite btn_block btn_med"
        type="submit"
        :disabled="loading"
        @click="submit"
      >
        Подтвердить
      </button>
    </div>
  </div>
</template>

<script>
import overlay from '@/mixins/overlay'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TicketsModal',
  mixins: [overlay],

  props: {
    lottery: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      page: 0,
      totalPages: this.lottery.ticketsCount / 25,
      loading: false,
      selectedTickets: []
    }
  },

  computed: {
    ...mapGetters('user', ['GET_BALANCE']),

    tickets() {
      return [...Array(this.lottery.ticketsCount).keys()]
    },

    selectedTicketsCost() {
      return this.selectedTickets.length * this.lottery.ticketCost
    }
  },

  watch: {
    'lottery.ownedTickets': {
      handler(value) {
        this.selectedTickets = this.selectedTickets.filter(
          (ticket) => !value.includes(ticket)
        )
      },
      deep: true
    }
  },

  methods: {
    ...mapActions('user', ['PAY_FROM_WALLET']),

    selectTicket(ticket) {
      this.selectedTickets.includes(ticket)
        ? (this.selectedTickets = this.selectedTickets.filter(
            (selectedTicket) => selectedTicket !== ticket
          ))
        : this.selectedTickets.push(ticket)
    },

    async submit() {
      if (this.selectedTickets.length === 0) {
        this.$eventBus.emit('pushMessage', {
          message: 'Необходимо выбрать как минимум один билет для участия'
        })
        return
      }

      if (this.GET_BALANCE < this.selectedTicketsCost) {
        this.$eventBus.emit('pushMessage', {
          message: 'Недостаточно средств на счету'
        })
        return
      }

      try {
        this.loading = true

        // Кривая оплата moment...

        await this.$axios.post(`/user-lottery/tickets/${this.lottery.serial}`, {
          tickets: this.selectedTickets
        })

        await this.PAY_FROM_WALLET(this.selectedTicketsCost)

        this.$eventBus.emit('pushMessage', {
          message: 'Билеты куплены успешно',
          type: 'success'
        })

        this.$emit('updateLotteryState')
        this.overlay = false
      } catch (e) {
        console.log(e)
        this.$catchErrors(e?.response)
        this.$emit('updateLotteryState')
      } finally {
        this.loading = false
      }
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
    align-items: center;
    justify-content: center;
    border: 1px solid $primary;
    border-radius: 10px;
    border-top-right-radius: 14px;
    width: 32px;
    height: 32px;
    font-weight: 700;
    font-size: 14px;
    color: $dark;

    &_selected {
      position: relative;
      overflow: hidden;
      border: 1px solid $gold;

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
        animation: left-to-right 1s;
        will-change: left;
      }
    }

    &:hover {
      @media (min-width: 1024px) {
        box-shadow: 1px 1px 10px $shadow;
        color: $primary;
        transform: scale(1.1);
      }
    }

    &:disabled {
      border: $gray;
      background: $gray-light;
      cursor: auto;
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
