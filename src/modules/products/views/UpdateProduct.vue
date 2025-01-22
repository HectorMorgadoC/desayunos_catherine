<template>

  <BrowserView
    :connection="false"
    :message="'Modificar producto'"
    />
    <div class="min-h-screen mx-auto p-4 mt-2">
      <div class="p-6 rounded-lg">
        <div class="flex flex-col gap-4 items-center">
          <div class="shadow-lg px-6 py-6 border-lg">
            <div>
            <select
            class="rounded-lg w-56 px-6 py-3 bg-yellow-400 text-start flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
            v-model="product"
            @change="dataProduct"
            >
              <option
              class="hover:bg-orange-300 hover:text-white"
              value="" >Seleccione un producto</option>
              <option
              class="hover:bg-orange-300 hover:text-white"
              v-for="(product, index) in listProduct "
              :key="index"
              :value="product.description"
              >
              {{ product.description }}
              </option>
            </select>
          </div>
          <div>
            <ul class="w-full">
              <li class="flex items-center">
                <button
                @click="RegisterDataProduct(dataProduct())"
                class="rounded-lg w-56 px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"
                > Modificar </button>
              </li>
            </ul>

          </div>
          </div>


        </div>
      </div>
      <div
      class="px-4 py-6 border-lg"
      v-if="productRegistrationVisibility">
            <form
            class="rounded-lg mx-48 px-48"
            @submit.prevent="modificatioRegisterProduct"
            >
              <div class="flex flex-col">

                <label
                class="block text-lg font-medium text-orange-600"
                >id del producto</label>
                <input
                v-model="productModificationRecord.id"
                class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                type="text"
                readonly
                required
                >

                <label
                class="block text-lg font-medium text-orange-600"
                >Ingrese la descripcion del producto</label>
                <input
                v-model="productModificationRecord.description"
                class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                type="text"
                placeholder="Descripcion de producto"
                required
                >
                <label
                class="block text-lg font-medium text-orange-600"
                >Ingrese el valor del producto</label>
                <input
                v-model="productModificationRecord.value"
                class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                type="number"
                placeholder="ingrese precio"
                required
                >
                <button
                class="w-full h-10 text-center mt-4 bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                type="submit"
                >Registrar</button>
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
  import { ref, reactive } from 'vue';
  import { updateProduct } from '../actions/updateProduct-action';
  import { useToast } from 'vue-toastification';

  const listProduct: Product[] = useLocalStorage<Product[]>('product',[]).value
  const product = ref<string>('')
  const productRegistrationVisibility = ref<boolean>(false)
  const toast = useToast()

  const productModificationRecord = reactive({
      id:'',
      description: '',
      value:0
  })

  const dataProduct = (): Product => {
    const productSelect: Product = listProduct.find( p => p.description === product.value)!

    if(!productSelect) {
      return {
        id: '',
        description: '',
        value: 0
      }

    }
    return productSelect
  }

  const RegisterDataProduct = (product: Product) => {
    if(product.id != '') {
      productModificationRecord.id = product.id || ''
      productModificationRecord.description = product.description
      productModificationRecord.value = product.value

      productRegistrationVisibility.value = true
    }
  }

  const modificatioRegisterProduct  = async() => {
    const product: Product = {
      id : productModificationRecord.id,
      description : productModificationRecord.description,
      value : productModificationRecord.value
    }

    const { data } = await updateProduct(product)

    productRegistrationVisibility.value = false
    toast.success(`${data.title} : ${data.description}`)
    console.log(data)


  }

</script>
