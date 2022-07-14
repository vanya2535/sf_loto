export default {
  data() {
    return {
      pagination: {
        page: 1,
        perPage: 20,
        totalPages: 1
      }
    }
  },

  methods: {
    setPaginationData(headers) {
      this.pagination.page = Number(headers['x-pagination-current-page'])
      this.pagination.perPage = Number(headers['x-pagination-per-page'])
      this.pagination.totalPages = Number(headers['x-pagination-page-count'])
    }
  }
}
