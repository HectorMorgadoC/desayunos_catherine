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
            @change="dataProduct"
            >
              <option value="" >Seleccione un producto</option>
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
                @click="RegisterDataProduct(dataProduct())"
                class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"
                > Modificar </button>
              </li>
            </ul>

          </div>

        </div>
      </div>
      <div v-if="productRegistrationVisibility">
            <form
            @submit.prevent="modificatioRegisterProduct"
            >
              <div class="flex flex-col">

                <label class="">id del producto</label>
                <input
                v-model="productModificationRecord.id"
                class=""
                type="text"
                readonly
                required
                >

                <label class="">Ingrese la descripcion del producto</label>
                <input
                v-model="productModificationRecord.description"
                class=""
                type="text"
                placeholder="Descripcion de producto"
                required
                >
                <label class="">Ingrese el valor del producto</label>
                <input
                v-model="productModificationRecord.value"
                class=""
                type="number"
                placeholder="ingrese precio"
                required
                >
                <button class=""
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
