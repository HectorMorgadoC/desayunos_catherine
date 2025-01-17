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
    },
        {
          path: "/finance/product",
          name: "product",
          component: () => import('@/modules/products/views/ProductView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "/finance/product/registration",
          name: "productRegistration",
          component: () => import('@/modules/products/views/RegistrationProduct.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "/finance/product/update",
          name: "productUpdate",
          component: () => import('@/modules/products/views/UpdateProduct.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "/finance/product/delete",
          name: "productDelete",
          component: () => import('@/modules/products/views/DeleteProduct.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "/finance/income",
          name: "income",
          component: () => import('@/modules/income/views/IncomeView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: "/finance/income/sale",
          name: "sale",
          component: () => import('@/modules/sale/views/SaleView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: "/finance/income/sale/registration",
          name: "saleRegistration",
          component: () => import('@/modules/sale/views/RegisterSale.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: "/finance/income/credit",
          name: "credit",
          component: () => import('@/modules/credit/views/CreditView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: "/finance/expenditure",
          name: "expenditure",
          component: () => import('@/modules/expenditures/views/ExpenditureView.vue'),
          meta: { requiresAuth: true },
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
