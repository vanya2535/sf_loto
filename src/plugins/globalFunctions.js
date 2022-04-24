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

export default {
  install: (app, options) => {
    app.config.globalProperties.$costMask = costMask
    app.config.globalProperties.$catchErrors = catchErrors
  }
}
