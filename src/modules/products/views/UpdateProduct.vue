<template>

  <BrowserView
    :connection="false"
    :message="'Modificar producto'"
    />
    <div class="min-h-screen mx-auto p-4 mt-2">
      <div class="mb-8 p-6 rounded-lg">
        <div class="flex gap-8 items-start">

          <div>
            <select
            v-model="product"
            @change="updateRegisterProduct"
            >
              <option value="" disabled selected>Seleccione un producto</option>
              <option
              v-for="(product, index) in listProduct "
              :key="index"
              :value="product.description"
              >
              {{ product.description }}
              </option>
            </select>
          </div>
          <div>
            <ul class="menu rounded-box w-56">
              <li class="flex items-center">
                <button
                class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"
                > Modificar </button>
              </li>
            </ul>

          </div>

        </div>
      </div>
      <div>
            <form
            @submit.prevent=""
            >
              <div class="flex flex-col">
                <label class="">Ingrese la descripcion del producto</label>
                <input

                class=""
                type="text"
                placeholder="Descripcion de producto"
                required
                >
                <label class="">Ingrese el valor del producto</label>
                <input

                class=""
                type="number"
                placeholder="ingrese precio"
                required
                >
                <button class=""
                @submit.prevent=""
                type="submit"
                >registrar</button>
              </div>
          </form>
          </div>
    </div>
    <FooterView />
  </template>

<script setup lang="ts">
  import type { Product } from '@/modules/menu/interface/menuData';
  import BrowserView from '@/modules/views/layout/BrowserView.vue';
  import FooterView from '@/modules/views/layout/FooterView.vue';
  import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';

  const listProduct: Product[] = useLocalStorage<Product[]>('product',[]).value
    const product = ref<string>('')

  const updateRegisterProduct = () => {
    const productSelect = listProduct.map( p => {
      if( p.description === product.value) {
        return p
      }
    } )

    console.log( productSelect )

  }



</script>
