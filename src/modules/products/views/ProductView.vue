<template>
  <BrowserView
  :connection="false"
  :message="'Productos'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center">
              <RouterLink
              :to="{name : 'productRegistration'}"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"
              > Registrar </RouterLink>
            </li>
            <li class="flex items-center">
              <RouterLink
              :to="{name : 'productUpdate'}"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"
              > Modificar </RouterLink>
            </li>
            <li class="flex items-center">
              <button class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Eliminar </button>
            </li>
          </ul>
        </div>
        <div>
          <div>


          </div>
          <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in listProduct" :key="index">
                <td class="border border-gray-300 px-4 py-2">{{ product.description }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ product.value }}</td>
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
