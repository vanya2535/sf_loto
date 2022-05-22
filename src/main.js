import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from './plugins/eventBus'
import { axios } from './plugins/axios'
import globalFunctions from './plugins/globalFunctions'
import elements from './components/elements'
import layouts from './layouts/'
import LottieAnimation from 'lottie-web-vue'

const app = createApp(App)

for (let component of [...elements, ...layouts]) {
  app.component(component.name, component)
}

app.use(LottieAnimation)

app.use(eventBus)
app.use(axios)
app.use(globalFunctions)

app.use(store).use(router).mount('#app')
