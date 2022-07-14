const costMask = (cost) =>
  `${cost}`.replace(/\s/g, '').replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')

function catchErrors(response) {
  if (response?.data) {
    if (response.data.message) {
      this.$eventBus.emit('pushMessage', {
        message: response.data.message
      })
    } else if (response.data.errors) {
      for (let error of response.data.errors) {
        this.setError(error.param, error.msg)
      }
    }
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString().replace(',', '').slice(0, 16)
}

const convertToQuery = (query) => {
  const result = []

  for (let key in query) {
    result.push(`${key}=${query[key]}`)
  }

  return result.join('&')
}

export default {
  install: (app, options) => {
    app.config.globalProperties.$costMask = costMask
    app.config.globalProperties.$catchErrors = catchErrors
    app.config.globalProperties.$formatDate = formatDate
    app.config.globalProperties.$convertToQuery = convertToQuery
  }
}
