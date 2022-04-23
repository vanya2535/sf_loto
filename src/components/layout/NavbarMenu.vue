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
    ...mapGetters('user', ['IS_AUTHORIZED'])
  },

  methods: {
    ...mapMutations('user', ['LOGOUT']),

    openAuthModal() {
      this.overlay = false
      this.$eventBus.emit('openAuthModal')
    },

    logout() {
      this.LOGOUT()
      this.$store.commit('message/PUSH_MESSAGE', {
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
  padding: 12px 24px;
  height: 50px;
  background: $white;
}

@media (max-width: 425px) {
  .menu {
    top: 48px !important;
  }
}
</style>
