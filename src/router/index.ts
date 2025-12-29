import { createRouter, createWebHistory } from 'vue-router'
import baseRoutes from './modules/base'
import projectRoutes from './modules/projects'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes,
    ...projectRoutes
  ],
})

export default router
