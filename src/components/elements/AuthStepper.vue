<template>
  <div class="stepper">
    <button
      v-for="(step, index) of steps"
      :key="index"
      class="stepper__step"
      :class="{ stepper__step_active: index === value }"
      type="button"
      @click="value = index"
    >
      {{ step }}
    </button>

    <div
      class="stepper__underline"
      :class="{ stepper__underline_right: value === 1 }"
    />
  </div>
</template>

<script>
import modelValue from '@/mixins/modelValue'

export default {
  name: 'AuthStepper',
  mixins: [modelValue],

  data() {
    return {
      steps: ['Войти', 'Регистрация']
    }
  }
}
</script>

<style lang="scss" scoped>
.stepper {
  position: relative;
  display: grid;
  column-gap: 10px;
  align-items: flex-end;
  grid-template-columns: 42px 88px;

  &__step {
    font-weight: 400;
    font-size: 14px;
    text-align: start;
    color: $dark;
    transition: 0.1s;

    &:hover,
    &_active {
      color: $graphite;
    }
  }

  &__underline {
    position: absolute;
    bottom: -2px;
    width: 42px;
    height: 2px;
    background: $primary;
    animation: slide-left 0.2s;

    &_right {
      left: 52px;
      width: 88px;
      animation: slide-right 0.2s;
    }
  }
}

@keyframes slide-left {
  from {
    left: 52px;
    width: 88px;
  }

  to {
    left: 0;
    width: 42px;
  }
}

@keyframes slide-right {
  from {
    left: 0;
    width: 42px;
  }

  to {
    left: 52px;
    width: 88px;
  }
}
</style>
