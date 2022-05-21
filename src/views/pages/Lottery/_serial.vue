<template>
  <LotteryItem v-if="lottery" :lottery="lottery" />
</template>

<script>
import LotteryItem from '@/components/lottery/LotteryItem'

export default {
  name: 'Lottery',
  components: { LotteryItem },

  data() {
    return {
      lottery: null
    }
  },

  async created() {
    const { serial } = this.$route.params

    if (!serial) {
      this.$router.push('/')
    }

    try {
      const { data } = await this.$axios.get(`/lottery/${serial}`)

      this.lottery = data
    } catch (e) {
      console.error(e)
      this.$catchErrors(e?.response)
    }
  }
}
</script>
