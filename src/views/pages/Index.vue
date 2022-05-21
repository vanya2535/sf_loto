<template>
  <div class="lotteries">
    <LotteryItem
      v-for="lottery of lotteries"
      :key="lottery.serial"
      :lottery="lottery"
    />
  </div>
</template>

<script>
import pagination from '@/mixins/pagination'
import LotteryItem from '@/components/lottery/LotteryItem.vue'

export default {
  name: 'Index',
  mixins: [pagination],
  components: { LotteryItem },

  data() {
    return {
      lotteries: [],
      observer: null
    }
  },

  methods: {
    async getLotteries() {
      try {
        const { data, headers } = await this.$axios.get(
          `/lottery?${this.$convertToQuery(this.pagination)}`
        )

        this.lotteries = [...this.lotteries, ...data]
        this.setPaginationData(headers)
      } catch (e) {
        console.log(e)
        this.$catchErrors(e?.reposnse)
      }
    }
  },

  created() {
    this.getLotteries()
  },

  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            if (this.pagination.page + 1 <= this.pagination.totalPages) {
              ++this.pagination.page
              this.getLotteries()
            }
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    this.observer.observe(document.querySelector('footer'))
  },

  beforeDestroy() {
    this.observer.disconnect()
  }
}
</script>

<style scoped>
.lotteries {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 1023px) {
  .lotteries {
    grid-template-columns: 1fr;
  }
}
</style>
