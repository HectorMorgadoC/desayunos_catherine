<template>

  <BrowserView
    :connection="false"
    :message="'Eliminar producto'"
    />
    <div class="min-h-screen mx-auto p-4 mt-2">
      <div class="p-6 rounded-lg">
        <div class="flex flex-col gap-4 items-center">
          <div class="shadow-lg px-6 py-6 border-lg">
            <div>
            <select
            class="rounded-lg w-56 px-6 py-3 bg-yellow-400 text-start flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
            v-model="product"
            >
              <option
              class="hover:bg-orange-300 hover:text-white"
              disabled selected>Seleccione un producto</option>
              <option
              v-for="(product, index) in listProduct "
              :key="index"
              :value="product.id"
              >
              {{ product.description }}
              </option>
            </select>
          </div>
          <div>
            <ul class="w-full">
              <li class="flex items-center">
                <ModalRegister
          :onSecondaryAction="() => deleteRegisterProduct(idProduct())"
          :message="'eliminar'"
          class="rounded-lg w-56 px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
          />
              </li>
            </ul>

          </div>
          </div>



        </div>
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
  import { useToast } from 'vue-toastification';
  import ModalRegister  from '../components/ModalRegister.vue';
  import { deleteProduct } from '../actions/deleteProduct-action';
  import router from '@/router';

  const listProduct: Product[] = useLocalStorage<Product[]>('product',[]).value
  const product = ref<string>('')
  const toast = useToast()

  const idProduct = (): string => {
    const selectedProduct = listProduct.find(p => p.id === product.value);
    const selectedProductId: string = selectedProduct ? selectedProduct.id as string : '';

    if(!selectedProductId) {
      return ''
    }
    return selectedProductId
  }


  const deleteRegisterProduct  = async(id: string) => {
    const { data } = await deleteProduct(id)
    console.log( data )
    router.push({name: 'product'})
    toast.success(`Producto eliminado`)

  }

</script>
