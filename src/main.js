import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from './plugins/eventBus'

const app = createApp(App)

app.use(eventBus)

app.use(store).use(router).mount('#app')
