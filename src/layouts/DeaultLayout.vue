<template>
  <Header />
  <main class="container">
    <slot />
  </main>
  <Footer />
  <AuthModal v-if="isAuthModalVisible" v-model="isAuthModalVisible" />
  <RefillModal v-if="isRefillModalVisible" v-model="isRefillModalVisible" />
  <FloatingMessage />
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingMessage from '@/components/layout/FloatingMessage'
import AuthModal from '@/components/modals/AuthModal'
import RefillModal from '@/components/modals/wallet/RefillModal'

export default {
  name: 'DefaultLayout',

  components: {
    Header,
    Footer,
    FloatingMessage,
    AuthModal,
    RefillModal
  },

  data() {
    return {
      isAuthModalVisible: false,
      isRefillModalVisible: false
    }
  },

  created() {
    this.$eventBus.on('openAuthModal', () => {
      this.isAuthModalVisible = true
    })

    this.$eventBus.on('openRefillModal', () => {
      this.isRefillModalVisible = true
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 110px auto 24px;
  border-radius: 12px;
  padding: 16px;
  width: 85vw;
  min-height: calc(100vh - 207px);
  max-width: 1440px;
  box-shadow: 0 10px 100px $shadow;
  background: $app;
}

@media (min-width: 768px) {
  .container {
    margin: 160px auto 24px;
    border-radius: 12px;
    width: 85vw;
    min-height: calc(100vh - 257px);
  }
}

@media (max-width: 768px) {
  .container {
    width: 90vw;
  }
}

@media (max-width: 425px) {
  .container {
    margin: 72px auto 24px;
    min-height: calc(100vh - 169px);
  }
}
</style>
