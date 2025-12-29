import { createRouter, createWebHistory } from 'vue-router'
import baseRoutes from './modules/base'
import projectRoutes from './modules/projects'
import gameRoutes from './modules/games'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes,
    ...projectRoutes,
    ...gameRoutes
  ],
})

export default router
