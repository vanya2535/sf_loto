<template>
  <Header />
  <main class="router-view">
    <router-view />
  </main>
  <Footer />
  <AuthModal v-if="isAuthModalVisible" v-model="isAuthModalVisible" />
  <RefillModal v-if="isRefillModalVisible" v-model="isRefillModalVisible" />
  <FloatingMessage />
</template>

<script>
import { useCookies } from 'vue3-cookies'
import { mapActions, mapMutations } from 'vuex'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuthModal from '@/components/modals/AuthModal'
import RefillModal from '@/components/modals/RefillModal'
import FloatingMessage from '@/components/layout/FloatingMessage'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    AuthModal,
    RefillModal,
    FloatingMessage
  },

  data() {
    AuthModal
    return {
      isAuthModalVisible: false,
      isRefillModalVisible: false
    }
  },

  methods: {
    ...mapActions('user', ['GET_USER_DATA']),
    ...mapMutations('user', ['SET_TOKEN'])
  },

  async created() {
    this.$eventBus.on('openAuthModal', () => {
      this.isAuthModalVisible = true
    })

    this.$eventBus.on('openRefillModal', () => {
      this.isRefillModalVisible = true
    })

    const { cookies } = useCookies()
    const token = cookies.get('auth_token')

    if (token) {
      this.GET_USER_DATA(token)
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
}

ul[class],
ol[class] {
  list-style: none;
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

html,
body {
  line-height: 1.5;
  text-rendering: optimizespeed;
  background: $app;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    background: #e5e5e6;
  }
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

a,
a:hover {
  text-decoration: none;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

img {
  display: block;
  max-width: 100%;
}

article > * + * {
  margin-top: 1em;
}

input,
button,
textarea,
select {
  font: inherit;
}

input {
  outline: none;
}

input:-webkit-autofill {
  box-shadow: inset 0 0 0 50px #fff !important;
}

#app {
  min-height: 100%;
  background: $app;
}

.router-view {
  margin: 110px auto 24px;
  border-radius: 12px;
  width: 85vw;
  min-height: calc(100vh - 207px);
  max-width: 1440px;
  box-shadow: 0 10px 100px $shadow;
  background: $app;
}

@media (min-width: 768px) {
  .router-view {
    margin: 160px auto 24px;
    border-radius: 12px;
    width: 85vw;
    min-height: calc(100vh - 257px);
  }
}

@media (max-width: 768px) {
  .router-view {
    width: 90vw;
  }
}

@media (max-width: 425px) {
  .router-view {
    margin: 72px auto 24px;
    min-height: calc(100vh - 169px);
  }
}
</style>
