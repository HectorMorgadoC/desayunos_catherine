<template>
  <BrowserView
  :connection="false"
  :message="'Menu'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div class="shadow p-3">
          <div>
            <ul class="menu rounded-box w-56">
            <li class="flex items-center">
              <RouterLink :to="{ name: 'product' }"
              class="w-full px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Productos </RouterLink></li>
            <li class="flex items-center">
              <RouterLink :to="{ name: 'income'}"
              class="w-full px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Ingresos </RouterLink></li>
            <li class="flex items-center">
              <RouterLink :to="{ name: 'expenditure'}"
              class="w-full px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Egresos </RouterLink></li>
          </ul>
          </div>
          <div class="flex my-6 flex-col items-center">
            <h2 class="text-lg text-orange-500">Saldo</h2>
            <p class="text-8xl text-orange-500">{{ viewBalance }}/s</p>
          </div>
        </div>
        <BannerProduct/>
      </div>
    </div>
    <RouterView />
  </div>
  <FooterView />

</template>

<script setup lang="ts">
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import BannerProduct from '@/modules/views/layout/BannerProduct.vue';
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
