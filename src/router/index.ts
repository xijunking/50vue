import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RealHome from '@/views/realHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'realHome',
      component: RealHome,
    },
    {
      path: '/day0',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/day1',
      name: 'day1',
      component: () => import('../views/day1-10/day1.vue'),
    },
    {
      path: '/day2',
      name: 'day2',
      component: () => import('../views/day1-10/day2.vue'),
    },
  ],
})

export default router
