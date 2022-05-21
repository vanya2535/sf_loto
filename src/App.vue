<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { useCookies } from 'vue3-cookies'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions('user', ['GET_USER_DATA']),
    ...mapMutations('user', ['SET_TOKEN'])
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'DefaultLayout'
    }
  },

  async created() {
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
</style>
