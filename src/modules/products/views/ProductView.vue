<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
  :connection="false"
  :message="'Productos'"
  />
      <div class="flex items-start justify-center gap-16 my-8">
        <div class="">
          <ul class="rounded-box w-56">
            <li class="flex items-center">
              <RouterLink
              :to="{name : 'productRegistration'}"
              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Registrar </RouterLink>
            </li>
            <li class="flex items-center">
              <RouterLink
              :to="{name : 'productUpdate'}"
              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Modificar </RouterLink>
            </li>
            <li class="flex items-center">
              <RouterLink
              :to="{name: 'productDelete'}"
              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Eliminar </RouterLink>
            </li>
          </ul>
        </div>
          <div>
          <table class="w-64 bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr class="bg-yellow-400 text-white">
                <th class="py-2 px-4 text-left">Producto</th>
                <th class="py-2 px-4 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in listProduct"
              :key="index"
              :class="{'bg-yellow-100': index % 2 === 0}" >

                <td class="px-4 py-2 text-red-500">{{ product.description }}</td>
                <td class="px-4 py-2 text-red-500">{{ product.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
  <FooterView />
  </div>

</template>

<script setup lang="ts">
  import type { Product } from '@/modules/menu/interface/menuData';
  import BrowserView from '@/modules/views/layout/BrowserView.vue'
  import FooterView from '@/modules/views/layout/FooterView.vue'
  import { useLocalStorage } from '@vueuse/core';
  import { ref } from 'vue'

  const listProduct = ref(useLocalStorage<Product[]>('product',[]))




</script>
