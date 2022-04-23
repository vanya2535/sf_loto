<template>
  <Header />
  <main class="router-view">
    <router-view />
  </main>
  <Footer />
  <AuthModal v-if="isAuthModalVisible" v-model="isAuthModalVisible" />
  <FloatingMessage />
</template>

<script>
import { useCookies } from 'vue3-cookies'
import { mapMutations } from 'vuex'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AuthModal from '@/components/modals/AuthModal'
import FloatingMessage from '@/components/layout/FloatingMessage'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    AuthModal,
    FloatingMessage
  },

  data() {
    AuthModal
    return {
      isAuthModalVisible: false
    }
  },

  methods: {
    ...mapMutations('user', ['SET_USER_DATA'])
  },

  async created() {
    this.$eventBus.on('openAuthModal', () => {
      this.isAuthModalVisible = true
    })

    const { cookies } = useCookies()
    const form = {
      token: cookies.get('auth_token'),
      user: {
        id: cookies.get('user_id'),
        username: cookies.get('username'),
        roles: JSON.parse(cookies.get('user_roles'))
      }
    }

    if (form.token && Object.values(form.user).every((value) => value.length)) {
      this.SET_USER_DATA(form)
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
  background: $background;
  scroll-behavior: smooth;
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

#app {
  min-height: 100%;
  background: $background;
}

.router-view {
  margin: 110px auto 24px;
  border-radius: 12px;
  width: 85vw;
  min-height: calc(100vh - 207px);
  max-width: 1440px;
  box-shadow: 0 10px 100px $shadow;
  background: $white;
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
