<template>
  <Header />
  <div class="space"></div>
  <main class="router-view">
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
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
