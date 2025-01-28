<template>
  <div class="flex flex-col min-h-screen">
    <!-- BrowserView -->
    <BrowserView
      :connection="false"
      :message="'Menu'"
    />

    <!-- Contenido principal -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8">
        <div class="grid place-items-center gap-8">
          <!-- Menú de navegación -->
          <div class="">
            <ul class="rounded-box w-56">
              <li class="flex items-center">
                <RouterLink
                  :to="{ name: 'product' }"
                  class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
                >
                  Productos
                </RouterLink>
              </li>
              <li class="flex items-center">
                <RouterLink
                  :to="{ name: 'income' }"
                  class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
                >
                  Ingresos
                </RouterLink>
              </li>
              <li class="flex items-center">
                <RouterLink
                  :to="{ name: 'expenditure' }"
                  class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
                >
                  Egresos
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Sección de Saldo -->
          <div class="text-center mt-8">
            <h2 class="text-2xl text-orange-500 font-bold mb-4">Saldo</h2>
            <p class="text-7xl text-orange-500 font-bold tracking-wider">{{ viewBalance }}/s</p>
          </div>
        </div>
      </div>
    </main>
    <!-- Footer -->
    <FooterView />
  </div>
</template>

<script setup lang="ts">
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import FooterView from '@/modules/views/layout/FooterView.vue';
import { useLocalStorage } from '@vueuse/core';
import { dataMenu } from '../actions/menuAction';
import type { Product,PaymentMethod } from '../interface/menuData';
import router from '@/router';




const viewBalance = useLocalStorage('balance',0)

const listMenu = async() => {
      const listData = await dataMenu()

      if ('message' in listData) {
        router.push({ name: 'lading' });
        throw new Error(`Error request menu: ${listData.message}`)
      }

      const product = useLocalStorage<Product[]>('product',listData.product)
      const payment_method = useLocalStorage<PaymentMethod[]>('payment_method', listData.payment_method)
      const balance = useLocalStorage('balance',listData.balance)

      viewBalance.value = listData.balance

      return {
        product,
        payment_method,
        balance
      }
}

listMenu()
</script>

