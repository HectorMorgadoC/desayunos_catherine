<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
    :connection="false"
    :message="'Registrar credito'"
  />
  <div class="flex items-start justify-center my-8">
      <div class="px-8 py-10 border-lg">
        <div class="flex-grow">
              <form
              @submit.prevent="registerSale"
              class="rounded-lg space-y-2 px-10"
              >
                <div class="flex flex-col">
                  <label
                  class="block text-lg font-medium text-orange-600"
                  >Fecha</label>
                  <input
                  v-model="newCredit.date"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="date"
                  required
                  >
                <label
                  class="block text-lg font-medium text-orange-600"
                >Producto</label>
                <select
                v-model="newCredit.description_product"
                class="background_all  mb-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                <option
                value=""
                disabled selected
                class="hover:bg-orange-300 hover:text-white"
                >Elija un producto</option>
                <option
                  v-for="(product, index) in ListProduct"
                  :key="index"
                  :value="product.description"
                  class="hover:bg-orange-300 hover:text-white"
                >
                  {{ product.description }}
                </option>
                </select>
                  <label
                  class="block text-lg font-medium text-orange-600"
                  >Cantidad</label>
                  <input
                  v-model="newCredit.quantity"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="number"
                  placeholder="Ingrese la cantidad"
                  required
                  >
                  <label
                  class="block text-lg font-medium text-orange-600"
                  >Total</label>
                  <input
                  v-model="totalPrice"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="string"
                  required
                  >
                  <label
                  class="block text-lg font-medium text-orange-600"
                  >Nombre del cliente</label>
                  <input
                  v-model="newCredit.creditor_name"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="text"
                  required
                  >
                  <button
                  class="w-full h-10 mt-4 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                  @submit.prevent="registerSale"
                  type="submit"
                  >registrar</button>
                </div>
            </form>
        </div>
      </div>

  </div>
  <FooterView />
  </div>

  </template>

  <script setup lang="ts">
    import BrowserView from '@/modules/views/layout/BrowserView.vue';
    import FooterView from '@/modules/views/layout/FooterView.vue';
    import { reactive, ref, watch } from 'vue';
    import { useToast } from 'vue-toastification'
    import { useLocalStorage } from '@vueuse/core';
  	import type { Product } from '@/modules/menu/interface/menuData'
    import type { Credit } from '../interface/credit';
    import { RegistrationCredit } from '../actions/registerCredit-action';

    const totalPrice = ref<number>(0)
    const newCredit: Credit = reactive({
      date: '',
      description_product: '',
      quantity: 0,
      total_price: 0,
      creditor_name: '',
    })

  const ListProduct: Product[] = useLocalStorage('product',[]).value



  const registerSale = async() => {
    const toast = useToast()
    newCredit.total_price = totalPrice.value

    try {
      const newRegisterCreditData = await RegistrationCredit(newCredit);

      if ('description' in newRegisterCreditData) {
        const { title, description } = newRegisterCreditData
        newCredit.date =  ''
        newCredit.description_product =''
        newCredit.quantity = 0
        newCredit.total_price = 0
        newCredit.creditor_name = ''
        toast.success(`${title} : ${description}`)
      } else {
        toast.error('Nuevo credito no registrada')
      }

    } catch (error) {
      throw new Error(`Error new register credit: ${error}`)
    }

  }


  watch(
  () => newCredit.quantity,
  () => {
    const productDescription = ListProduct.find((e) => e.description === newCredit.description_product);
    const productValue: number = productDescription ? productDescription.value : 0;
    totalPrice.value = productValue * newCredit.quantity
  }

);


  </script>
