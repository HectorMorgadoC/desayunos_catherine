<template>
  <BrowserView
  :connection="false"
  :message="'Menu'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center"><RouterLink :to="{ name: 'product' }" class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Productos </RouterLink></li>
            <li class="flex items-center"><RouterLink :to="{ name: 'income'}" class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Ingresos </RouterLink></li>
            <li class="flex items-center"><RouterLink :to="{ name: 'expenditure'}" class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Egresos </RouterLink></li>
          </ul>
        </div>
        <div>
          <h2 class="text-lg">Saldo</h2>
          <p class="text-6xl">{{ viewBalance }} /s</p>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
  <FooterView />

</template>

<script setup lang="ts">
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import FooterView from '@/modules/views/layout/FooterView.vue';
import { useLocalStorage } from '@vueuse/core';
import { dataMenu } from '../actions/menuAction';
import type { Product,PaymentMethod } from '../interface/menuData';
import router from '@/router';
import { RouterView } from 'vue-router';



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
