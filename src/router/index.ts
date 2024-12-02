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
    {
      path: '/day3',
      name: 'day3',
      component: () => import('../views/day1-10/day3.vue'),
    },
    {
      path: '/day4',
      name: 'day4',
      component: () => import('../views/day1-10/day4.vue'),
    },
    {
      path: '/day5',
      name: 'day5',
      component: () => import('../views/day1-10/day5.vue'),
    },
  ],
})

export default router
