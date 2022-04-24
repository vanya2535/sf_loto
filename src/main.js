import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from './plugins/eventBus'
import globalFunctions from './plugins/globalFunctions'
import elements from './components/elements'

const app = createApp(App)

for (let component of elements) {
  app.component(component.name, component)
}

app.use(eventBus)
app.use(globalFunctions)

app.use(store).use(router).mount('#app')
