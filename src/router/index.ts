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
      path: "/finansa",
      name: "finansa",
<<<<<<< HEAD
      component: () => import('@/modules/menu/layout/MenuFinansa.vue')
=======
      component: () => import('@/modules/menu/views/MenuFinansaVue.vue'),
      meta: { requiresAuth: true },
      children: [
      ]
>>>>>>> eb334ff (Agregar configuración de entorno, Add environment settings, authentication interfaces, and menus; implement login and menu actions; integrate Vue Query Devtools and Toast; Update routes and views.)
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
