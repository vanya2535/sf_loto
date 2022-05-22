<template>
  <div v-if="lottery" class="lottery">
    <LotteryItem :lottery="lottery" />

    <div class="lottery__information">
      <lottie-animation
        class="lottery__animation"
        loop
        :animationData="animation"
      />

      <h1 class="lottery__status">{{ lotteryStatus }}</h1>

      <p class="lottery__state">
        {{ lotteryState }} <br />
        <template v-if="lottery.status === 'waiting'">
          {{ statusDelay }}
        </template>
      </p>

      <button
        v-if="lotteryAction"
        class="lottery__action btn btn_graphite btn_med"
        @click="onActionClick"
      >
        {{ lotteryAction }}
      </button>
    </div>

    <TicketsModal
      v-if="isTicketsModalVisible"
      v-model="isTicketsModalVisible"
      :lottery="lottery"
      @updateLotteryState="updateLotteryState"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LotteryItem from '@/components/lottery/LotteryItem'
import TicketsModal from '@/components/modals/lottery/TicketsModal'

export default {
  name: 'Lottery',

  components: {
    LotteryItem,
    TicketsModal
  },

  data() {
    return {
      lottery: null,
      dateNow: Date.now(),
      isTicketsModalVisible: false,
      isResultsModalVisible: false
    }
  },

  computed: {
    ...mapGetters('user', ['IS_AUTHORIZED']),

    animation() {
      switch (this.lottery.status) {
        case 'waiting':
          return require('@/assets/animations/clock.json')
        case 'started':
          return require('@/assets/animations/ticket.json')
        default:
          return require('@/assets/animations/salute.json')
      }
    },

    lotteryStatus() {
      switch (this.lottery.status) {
        case 'waiting':
          return 'Лотерея еще не началась'
        case 'started':
          return 'Лотерея уже началась'
        default:
          return 'Лотерея завершена'
      }
    },

    lotteryState() {
      switch (this.lottery.status) {
        case 'waiting':
          return 'До начала лотереи:'
        case 'started':
          return 'Спешите принять участие'
        default:
          return 'Ознакомьтесь с результатами'
      }
    },

    lotteryAction() {
      switch (this.lottery.status) {
        case 'waiting':
          // return 'Добавить в избранное'
          return
        case 'started':
          return 'Купить билеты'
        default:
          return 'Узнать результат'
      }
    },

    statusDelay() {
      const result = []

      const delay = new Date(this.lottery.startDate) - new Date(this.dateNow)

      if (delay > 0) {
        const days = Math.floor(delay / 1000 / 60 / 60 / 24)
        result.push(days + ' д.')

        const hours = Math.floor(delay / 1000 / 60 / 60) % 24
        result.push(hours + ' ч.')

        const minutes = Math.floor(delay / 1000 / 60) % 60
        result.push(minutes + ' мин.')

        const seconds = Math.floor(delay / 1000) % 60
        result.push(seconds + ' c.')
      }

      return result.filter((time) => Number.parseInt(time) > 0).join(' ')
    }
  },

  watch: {
    async dateNow(value) {
      if (
        (value > this.lottery.startDate && this.lottery.status === 'waiting') ||
        (value > this.lottery.finishDate && this.lottery.status === 'started')
      ) {
        document.location.reload()
      }
    }
  },

  methods: {
    onActionClick() {
      if (!this.IS_AUTHORIZED) {
        this.$eventBus.emit('openAuthModal')
        return
      }

      switch (this.lottery.status) {
        case 'waiting':
          return this.$eventBus.emit('pushMessage', {
            message: 'Функционал находится в разработке'
          })
        case 'started':
          return (this.isTicketsModalVisible = true)
        default:
          return (this.isResultsModalVisible = true)
      }
    },

    async updateLotteryState() {
      try {
        const { data } = await this.$axios.get(
          `/lottery/${this.$route.params.serial}`
        )
        this.lottery = data
      } catch (e) {
        console.error(e)
        this.$catchErrors(e?.response)
      }
    }
  },

  async created() {
    const { serial } = this.$route.params

    if (!serial) {
      this.$router.push('/')
    }

    try {
      const { data } = await this.$axios.get(`/lottery/${serial}`)

      this.lottery = data

      setInterval(() => {
        this.dateNow += 1000
      }, 1000)
    } catch (e) {
      console.error(e)
      this.$catchErrors(e?.response)
    }
  }
}
</script>

<style lang="scss" scoped>
.lottery {
  &__animation {
    margin: 32px auto 8px;
    width: 20vw;
    max-width: 300px;
    filter: drop-shadow(2px 4px 6px $primary);
  }

  &__status {
    font-size: 36px;
    line-height: 41px;
    letter-spacing: -1.5px;
    text-align: center;
    color: $primary;
  }

  &__state {
    margin-top: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.3px;
    text-align: center;
    color: $graphite;

    br {
      display: none;
    }
  }

  &__action {
    display: block;
    margin: 0 auto;
    margin-top: 48px;
  }
}

@media (max-width: 767px) {
  .lottery {
    &__animation {
      width: 30vw;
    }

    &__status {
      font-size: 32px;
    }

    &__state {
      font-size: 16px;

      br {
        display: block;
      }
    }
  }
}
</style>
