<template>
  <div class="lottery">
    <div class="lottery__status" :class="`lottery__status_${lottery.status}`">
      {{ lotteryStatus }}
    </div>

    <div class="lottery__body">
      <h1 class="lottery__title">{{ lottery.title }}</h1>

      <div class="lottery__prizes">
        <span
          v-for="(prize, index) of lottery.prizes"
          :key="index"
          class="prize"
        >
          {{ $costMask(prize) }} ₽
        </span>
      </div>

      <p class="lottery__description">
        {{ lottery.description }}
      </p>

      <router-link :to="`/lottery/${lottery.serial}`" target="_blank">
        <button class="btn btn_graphite btn_med">
          {{ buttonText }}
        </button>
      </router-link>
    </div>

    <div class="lottery__information">
      <h2 class="lottery__ticket-cost">
        Стоимость билета: {{ $costMask(lottery.ticketCost) }} ₽
      </h2>

      <h3 class="lottery__tickets-count">
        Всего билетов: {{ $costMask(lottery.ticketsCount) }}
      </h3>

      <div class="lottery__dates">
        <p v-if="lottery.status === 'waiting'" class="lottery__start-date">
          Билеты станут доступны к покупке {{ $formatDate(lottery.startDate) }}
        </p>

        <p
          v-if="['waiting', 'started'].includes(lottery.status)"
          class="lottery__finish-date"
        >
          Призы будут разыграны {{ $formatDate(lottery.finishDate) }}
        </p>

        <p v-if="lottery.status === 'finished'" class="lottery__finish-date">
          Призы были разыграны {{ $formatDate(lottery.finishDate) }}
        </p>
      </div>

      <div class="lottery__serial">
        {{ lottery.serial }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LotteryItem',

  props: {
    lottery: {
      type: Object,
      required: true,

      validator: (value) =>
        [
          'status',
          'title',
          'prizes',
          'description',
          'ticketCost',
          'ticketsCount',
          'startDate',
          'finishDate'
        ].every((field) => value.hasOwnProperty(field))
    }
  },

  computed: {
    lotteryStatus() {
      return {
        waiting: 'Еще не началась',
        started: 'Билеты доступны к покупке',
        finished: 'Призы уже разыграны'
      }[this.lottery.status]
    },

    buttonText() {
      return {
        waiting: 'Подробнее',
        started: 'Учавствовать',
        finished: 'Узнать результат'
      }[this.lottery.status]
    }
  }
}
</script>

<style lang="scss" scoped>
.lottery {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  border-radius: 12px;
  min-height: 258px;
  background: $white;

  &__body {
    position: relative;
    border-right: 1px solid $gray-light;
    padding: 60px 20px 80px;
  }

  &__information {
    position: relative;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 20px 20px 96px;
    background: $background-gray;
  }

  &__status {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 3;
    border-radius: 12px 4px;
    padding: 6px 12px;
    height: 33px;
    font-size: 14px;
    text-shadow: 1px 1px 0 $dark;
    color: $white;

    &_waiting {
      background: linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db);
    }

    &_started {
      background: linear-gradient(90deg, #faf0cd, #fab397);
    }

    &_finished {
      background: linear-gradient(90deg, #f598a8, $gold);
    }
  }

  &__title {
    font-weight: 500;
    font-size: 24px;
    color: $dark;
  }

  &__prizes {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    gap: 10px;

    .prize {
      position: relative;
      overflow: hidden;
      border: 1px solid $gray-light;
      border-radius: 6px;
      padding: 5px 10px;
      font-weight: 500;
      font-size: 14px;
      color: $dark;
    }
  }

  &__description {
    margin-top: 18px;
    font-size: 13px;
  }

  &__ticket-cost {
    font-weight: 500;
    font-size: 18px;
    color: $dark;
  }

  &__tickets-count {
    margin-top: 6px;
    font-weight: 400;
    font-size: 14px;
    color: $gray;
  }

  &__start-date {
    margin-top: 18px;
  }

  &__finish-date {
    margin-top: 6px;
  }

  &__serial {
    position: absolute;
    right: 20px;
    bottom: 6px;
    z-index: 3;
    max-width: 90%;
    font-size: 9px;
    white-space: nowrap;
    color: $gray;
  }

  &:hover {
    @media (min-width: 1024px) {
      z-index: 2;
      box-shadow: 20px 20px 100px $shadow;
      transform: scale(1.01);

      .prize {
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
    }
  }

  .btn,
  &__dates {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    z-index: 3;
  }

  &__start-date,
  &__finish-date {
    font-size: 12px;
    color: $gray;
  }
}

@media (max-width: 768px) {
  .lottery {
    grid-template-columns: 1fr;

    &__body {
      border-right: none;
      border-bottom: 1px solid $gray-light;
    }

    &__information {
      border-top-right-radius: 0;
      border-bottom-left-radius: 12px;
    }
  }
}

@keyframes left-to-right {
  from {
    left: -50%;
  }

  to {
    right: 150%;
  }
}
</style>
