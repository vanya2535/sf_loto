import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/pages/Index'
import Lottery from '@/views/pages/Lottery/_serial'

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index,
    meta: {
      title: 'Главная'
    }
  },
  {
    name: 'Lottery',
    path: '/lottery/:serial',
    component: Lottery,
    meta: {
      title: 'Лотерея'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.head.querySelector('title').innerText = `СФ ЛОТО ${to.meta.title}`
})

export default router
