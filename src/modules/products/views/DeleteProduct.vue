<template>

  <BrowserView
    :connection="false"
    :message="'Eliminar producto'"
    />
    <div class="min-h-screen mx-auto p-4 mt-2">
      <div class="mb-8 p-6 rounded-lg">
        <div class="flex gap-8 items-start">

          <div>
            <select
            v-model="product"
            >
              <option value="" disabled selected>Seleccione un producto</option>
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
            <ul class="menu rounded-box w-56">
              <li class="flex items-center">

              </li>
            </ul>

          </div>
          <ModalProduct
          :onSecondaryAction="() => deleteRegisterProduct(idProduct())"
          :message="'eliminar'"
          />

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
  import ModalProduct from '../components/ModalProduct.vue';
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
    router.push({name: 'product'})
    toast.success(`${data.title} : ${data.description}`)


  }

</script>
