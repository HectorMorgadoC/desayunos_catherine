<template>

  <BrowserView
    :connection="false"
    :message="'Registrar credito'"
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
                  v-model="newCredit.date"
                  class=""
                  type="date"
                  required
                  >
                <label >Producto</label>
                <select
                v-model="newCredit.description_product"
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
                  v-model="newCredit.quantity"
                  class=""
                  type="number"
                  placeholder="Ingrese la cantidad"
                  required
                  >
                  <label class="">Total</label>
                  <input
                  v-model="totalPrice"
                  class=""
                  type="string"
                  required
                  >
                  <label class="">Nombre del cliente</label>
                  <input
                  v-model="newCredit.creditor_name"
                  class=""
                  type="text"
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
    import { useToast } from 'vue-toastification'
    import { useLocalStorage } from '@vueuse/core';
  	import type { Product } from '@/modules/menu/interface/menuData'
    import type { Credit } from '../interface/credit';
    import { RegistrationCredit } from '../actions/registerCredit-action';

  const newCredit: Credit = reactive({
    date: '',
    description_product: '',
    quantity: 0,
    total_price: 0,
    creditor_name: '',
  })

  const ListProduct: Product[] = useLocalStorage('product',[]).value
  const totalPrice = ref<number>(newCredit.quantity)


  const registerSale = async() => {
    const toast = useToast()

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
