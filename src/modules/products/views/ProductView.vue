<template>
  <BrowserView
  :connection="false"
  :message="'Productos'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start gap-64">
        <div class="shadow p-3">
          <ul class="menu rounded-box w-56">
            <li class="flex items-center">
              <RouterLink
              :to="{name : 'productRegistration'}"
              class="w-full px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Registrar </RouterLink>
            </li>
            <li class="flex items-center">
              <RouterLink
              :to="{name : 'productUpdate'}"
              class="w-full px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
              > Modificar </RouterLink>
            </li>
            <li class="flex items-center">
              <RouterLink
              :to="{name: 'productDelete'}"
              class="w-full px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Eliminar </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <div>


          </div>
          <div class="container mx-auto p-4">
          <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr class="bg-yellow-400 text-white">
                <th class="py-2 px-4 text-left">Indice</th>
                <th class="py-2 px-4 text-left">Producto</th>
                <th class="py-2 px-4 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in listProduct"
              :key="index"
              :class="{'bg-yellow-100': index % 2 === 0}" >
                <td class="px-4 py-2 text-red-500">{{ index }}</td>
                <td class="px-4 py-2 text-red-500">{{ product.description }}</td>
                <td class="px-4 py-2 text-red-500">{{ product.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
</template>

<script setup lang="ts">
  import type { Product } from '@/modules/menu/interface/menuData';
  import BrowserView from '@/modules/views/layout/BrowserView.vue'
  import FooterView from '@/modules/views/layout/FooterView.vue'
  import { useLocalStorage } from '@vueuse/core';
  import { ref } from 'vue'

  const listProduct = ref(useLocalStorage<Product[]>('product',[]))




</script>
