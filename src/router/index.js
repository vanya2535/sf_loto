import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/pages/Index'

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
