<template>
  <nav class="overlay menu" @click="overlay = false">
    <div class="navbar d-flex" @click.stop>
      <button
        v-if="!IS_AUTHORIZED"
        class="btn btn_outlined btn_sm"
        @click="openAuthModal"
      >
        Войти
      </button>

      <button
        v-if="GET_USER_ROLES.includes('USER')"
        class="btn btn_outlined btn_sm"
        @click="$eventBus.emit('openRefillModal')"
      >
        Пополнить кошелек
      </button>

      <button
        v-if="IS_AUTHORIZED"
        class="btn btn_outlined btn_sm"
        @click="logout"
      >
        Выйти
      </button>
    </div>
  </nav>
</template>

<script>
import overlay from '@/mixins/overlay'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NavbarMenu',
  mixins: [overlay],

  computed: {
    ...mapGetters('user', ['IS_AUTHORIZED', 'GET_USER_ROLES'])
  },

  methods: {
    ...mapMutations('user', ['LOGOUT']),

    openAuthModal() {
      this.overlay = false
      this.$eventBus.emit('openAuthModal')
    },

    logout() {
      this.LOGOUT()
      this.$eventBus.emit('pushMessage', {
        message: 'Вы успешно вышли из учетной записи',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  top: 76px !important;
}

.navbar {
  column-gap: 16px;
  padding: 12px 24px;
  height: 50px;
  background: $white;
}

@media (min-width: 768px) {
  .menu {
    bottom: auto !important;
  }

  .navbar {
    flex-direction: row-reverse;
    justify-content: end;
    padding: 12px 20px;
    height: 47px;
  }
}

@media (max-width: 768px) {
  .navbar {
    column-gap: 10px;
  }
}

@media (max-width: 425px) {
  .menu {
    top: 48px !important;
  }

  .navbar {
    display: grid;
    justify-content: center;
    grid-template-columns: 0.95fr;
    padding: 10px 16px;
    height: auto;
    gap: 6px;
  }
}
</style>
