import { createRouter, createWebHistory } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'

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
      path: "/finance",
      name: "finance",
      component: () => import('@/modules/menu/views/MenuFinansaVue.vue'),
      meta: { requiresAuth: true },
      children: [
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = useLocalStorage('token',null).value

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
