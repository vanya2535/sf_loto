<template>
  <div :class="{ error: error.length }">
    <div class="input__wrapper">
      <input
        :id="name"
        v-model="value"
        :name="name"
        :type="type"
        class="input"
        :class="{
          'input_not-empty': value.length,
          input_error: !!error.length
        }"
        :autocomplete="autocomplete"
      />

      <label class="input__label" :for="name">{{ label }}</label>

      <button
        v-if="inputType === 'password'"
        class="input__mode-button d-flex"
        type="button"
        @click="isValueVisible = !isValueVisible"
      >
        <svg
          v-show="!isValueVisible"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <svg
          v-show="isValueVisible"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
          />
        </svg>
      </button>
    </div>

    <p class="input__error">{{ error }}</p>
  </div>
</template>

<script>
import modelValue from '@/mixins/modelValue'

export default {
  name: 'FormInput',
  mixins: [modelValue],

  props: {
    name: {
      type: String,
      default: 'input'
    },

    label: {
      type: String,
      default: ''
    },

    inputType: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password'].includes(value)
    },

    autocomplete: {
      type: String,
      default: 'off'
    },

    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isValueVisible: false
    }
  },

  computed: {
    type() {
      return this.inputType === 'text'
        ? 'text'
        : this.isValueVisible
        ? 'text'
        : 'password'
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  border: 1px solid $gray-light;
  border-radius: 4px;
  padding: 10px 12px;
  width: 100%;
  font-size: 18px;
  color: $dark;

  &__wrapper {
    position: relative;
  }

  &__label {
    position: absolute;
    left: 8px;
    top: 50%;
    padding: 0 3px;
    font-size: 14px;
    white-space: nowrap;
    color: $gray;
    background: ($white);
    transform: translateY(-50%);
    transition: 0.1s;
    pointer-events: none;

    &_error {
      top: auto;
      bottom: -44%;
    }
  }

  &__mode-button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    border-left: 1px solid $gray-light;
    aspect-ratio: 1;

    svg {
      stroke: $gray;
    }

    &:hover {
      @media (min-width: 1024px) {
        box-shadow: 0 1px 10px $shadow;

        svg {
          stroke: $graphite;
        }
      }
    }
  }

  &__error {
    margin-left: 8px;
    font-size: 12px;
    color: $red;
    opacity: 0;
    transition: 0.1s;
  }

  &_error {
    border: 1px solid $red;

    & ~ .input__mode-button {
      border-left: 1px solid $red;
    }
  }

  &:focus-visible ~ &__label {
    top: -44%;
    transform: translateY(50%);
  }

  &:hover,
  &:focus-visible {
    box-shadow: 0 1px 10px $shadow;
  }

  &_error ~ &__label {
    color: $red;
  }

  &_not-empty ~ &__label {
    top: -44%;
    transform: translateY(50%);
  }
}

.error .input__error {
  opacity: 1;
}

@media (min-width: 767px) {
  .input {
    min-width: 350px;
  }
}
</style>
