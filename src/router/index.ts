import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "lading",
      component: () => import('@/modules/views/LadingView.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/modules/auth/views/LoginView.vue')
    },
    {
      path: "/finansa",
      name: "finansa",
      component: () => import('@/modules/menu/layout/MenuFinansa.vue')
    }
  ],
})

export default router
