<template>
  <div class="overlay" @click="overlay = false">
    <form
      class="auth-modal overlay__modal"
      @click.stop
      @submit.prevent="submit"
    >
      <AuthStepper v-model="step" />

      <div class="auth-modal__inputs">
        <Forminput
          v-model="form.username"
          name="username"
          label="Имя пользователя"
          autocomplete="username"
          :error="getError('username')"
          @input="resetErrors('username')"
        />

        <Forminput
          v-model="form.password"
          :name="step === 0 ? 'current-password' : 'new-password'"
          label="Пароль"
          inputType="password"
          :autocomplete="step === 0 ? 'current-password' : 'new-password'"
          :error="getError('password')"
          @input="resetErrors('password')"
        />

        <Forminput
          v-show="step === 1"
          v-model="confirmPassword"
          name="new-password-confirm"
          label="Пароль"
          inputType="password"
          autocomplete="new-password"
          :error="getError('confirmPassword')"
          @input="resetErrors('confirmPassword')"
        />
      </div>

      <button
        class="auth-modal__submit-button btn btn_graphite btn_block btn_med"
        type="submit"
        :disabled="loading"
      >
        Подтвердить
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Forminput from '@/components/elements/FormInput'
import overlay from '@/mixins/overlay'
import AuthStepper from '@/components/elements/AuthStepper'
import validationErrors from '@/mixins/validationErrors'

export default {
  name: 'AuthModal',
  mixins: [overlay, validationErrors],
  components: { Forminput, AuthStepper },

  data() {
    return {
      step: 0,
      loading: false,

      title: [
        'Войти в существующую учетную запись',
        'Зарегистрировать новую учетную запись'
      ],

      form: {
        username: '',
        password: ''
      },

      confirmPassword: ''
    }
  },

  methods: {
    ...mapActions('user', ['LOGIN', 'REGISTER']),

    async submit() {
      for (let field of ['username', 'password']) {
        if (!this.form[field].length) {
          this.setError(field, 'Поле обязательно для заполнения')
        }
      }

      if (this.step === 1 && this.confirmPassword !== this.form.password) {
        this.setError('confirmPassword', 'Пароли не совпадают')
      }

      if (this.hasErrors) {
        return
      }

      try {
        this.loading = true

        switch (this.step) {
          case 0:
            await this.LOGIN({ ...this.form, role: 'USER' })

            this.$eventBus.emit('pushMessage', {
              message: 'Вы успешно вошли в учетную запись',
              type: 'success'
            })
            break
          case 1:
            await this.REGISTER(this.form)

            this.$eventBus.emit('pushMessage', {
              message: 'Вы успешно зарегистрировали учетную запись',
              type: 'success'
            })
            break
        }

        this.overlay = false
      } catch (e) {
        console.error(e.response)
        this.catchErrors(e?.response)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-modal {
  &__title {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: -0.7px;
    text-align: center;
  }

  &__inputs {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 20px;
    row-gap: 18px;
  }

  &__submit-button {
    margin-top: 20px;
  }
}
</style>
