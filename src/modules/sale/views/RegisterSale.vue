<template>

  <BrowserView
    :connection="false"
    :message="'Registrar venta'"
    />
    <div class="min-h-screen mx-auto p-4 mt-2">
      <div class="mb-8 p-6 rounded-lg">
        <div class="flex gap-8 items-start">
          <div>
              <form
              @submit.prevent="registerSale"
              >
                <div class="flex flex-col">
                  <label class="">Fecha</label>
                  <input
                  v-model="newSale.date"
                  class=""
                  type="date"
                  required
                  >
                <label >Producto</label>
                <select
                v-model="newSale.description_product"
                >
                <option value="" disabled selected>Elija un producto</option>
                <option
                  v-for="(product, index) in ListProduct"
                  :key="index"
                  :value="product.description"
                >
                  {{ product.description }}
                </option>
                </select>
                  <label class="">Cantidad</label>
                  <input
                  v-model="newSale.quantity"
                  class=""
                  type="number"
                  placeholder="Ingrese la cantidad"
                  required
                  >
                <label >Metodo de pago</label>
                <select
                v-model="newSale.payment_method"
                >
                <option value="" disabled selected>Elija un metodo de pago</option>
                <option
                  v-for="(paymentMethod, index) in ListPaymentMethod"
                  :key="index"
                  :value="paymentMethod.description"
                >
                  {{ paymentMethod.description }}
                </option>
                </select>
                  <label class="">Total</label>
                  <input
                  v-model="totalPrice"
                  class=""
                  type="string"
                  required
                  >
                  <button class=""
                  @submit.prevent="registerSale"
                  type="submit"
                  >registrar</button>
                </div>
            </form>
            </div>
        </div>
      </div>

    </div>
    <FooterView />
  </template>

  <script setup lang="ts">
    import BrowserView from '@/views/layout/BrowserView.vue';
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



  const registerSale = async() => {
    const toast = useToast()

    try {
      newSale.total_price = totalPrice.value
      console.log(newSale)
      const newRegisterSaleData = await RegistrationSale(newSale);


      if ('description' in newRegisterSaleData) {
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
