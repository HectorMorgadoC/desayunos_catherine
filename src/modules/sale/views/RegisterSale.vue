<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
    :connection="false"
    :message="'Registrar venta'"
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
                  v-model="newSale.date"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="date"
                  required
                  >
                <label
                class="block text-lg font-medium text-orange-600"
                >Producto</label>
                <select
                v-model="newSale.description_product"
                class="background_all  mb-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                <option
                class="hover:bg-orange-300 hover:text-white"
                value=""
                disabled selected>Elija un producto</option>
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
                  v-model="newSale.quantity"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="number"
                  placeholder="Ingrese la cantidad"
                  required
                  >
                <label
                class="block text-lg font-medium text-orange-600"
                >Metodo de pago</label>
                <select
                v-model="newSale.payment_method"
                class="background_all  mb-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                <option
                class="hover:bg-orange-300 hover:text-white"
                value=""
                disabled selected>Elija un metodo de pago</option>
                <option
                  v-for="(paymentMethod, index) in ListPaymentMethod"
                  :key="index"
                  :value="paymentMethod.description"
                  class="hover:bg-orange-300 hover:text-white"
                >
                  {{ paymentMethod.description }}
                </option>
                </select>
                  <label
                  class="block text-lg font-medium text-orange-600"
                  >Total</label>
                  <input
                  v-model="totalPrice"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="string"
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
    import { RegistrationSale } from '../actions/registerSale-action';
    import { useToast } from 'vue-toastification'
    import type { Sale } from '@/modules/sale/interface/sale'
    import { useLocalStorage } from '@vueuse/core';
  	import type { Product, PaymentMethod } from '@/modules/menu/interface/menuData'

  const totalPrice = ref<number>(0)
  const newSale: Sale = reactive({
        date: '',
        description_product:'',
        quantity: 0,
        payment_method: '',
        total_price: 0
      })

  const ListProduct: Product[] = useLocalStorage('product',[]).value
  const ListPaymentMethod: PaymentMethod[] = useLocalStorage('payment_method',[]).value
  const balance = useLocalStorage('balance',0)



  const registerSale = async() => {
    const toast = useToast()

    try {
      newSale.total_price = totalPrice.value
      console.log(newSale)
      const newRegisterSaleData = await RegistrationSale(newSale);


      if ('description' in newRegisterSaleData) {
        balance.value = balance.value + newSale.total_price
        const { title, description } = newRegisterSaleData
        newSale.date =  ''
        newSale.description_product =''
        newSale.quantity = 0
        newSale.payment_method = ''
        newSale.total_price = 0
        toast.success(`${title} : ${description}`)
      } else {
        toast.error('Nueva venta no registrada')
      }

    } catch (error) {
      throw new Error(`Error new register sale: ${error}`)
    }

  }

  watch(
  () => newSale.quantity,
  () => {
    const productDescription = ListProduct.find((e) => e.description === newSale.description_product);
    const productValue: number = productDescription ? productDescription.value : 0;
    totalPrice.value = productValue * newSale.quantity
  }

);


  </script>
