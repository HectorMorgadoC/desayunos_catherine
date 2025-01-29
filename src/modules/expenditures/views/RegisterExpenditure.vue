<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
    :connection="false"
    :message="'Registrar gastos'"
    />
    <div class="flex items-start justify-center my-8">
      <div class="px-8 py-10 border-lg">
        <div class="flex-grow">
              <form
              @submit.prevent="registerExpenditure"
              >
                <div class="flex flex-col">
                  <label class="block text-lg font-medium text-orange-600">Fecha</label>
                  <input
                  v-model="newExpenditure.date"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="date"
                  required
                  >
                <label class="block text-lg font-medium text-orange-600">Descripcion</label>
                  <input
                  v-model="newExpenditure.description"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="text"
                  placeholder="Ingrese descripcion"
                  required
                  >
                <label class="block text-lg font-medium text-orange-600">Costo</label>
                  <input
                  v-model="newExpenditure.value"
                  class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  type="text"
                  required
                  >
                  <button class="w-full h-10 mt-4 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                  @submit.prevent="registerExpenditure"
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
    import { reactive } from 'vue';
    import { useToast } from 'vue-toastification'
    import type { Expenditure } from '../interface/expenditure';
    import { registrationExpenditure } from '../actions/registerExpenditure-action';
    import { useLocalStorage } from '@vueuse/core';


  const toast = useToast()
  const balance = useLocalStorage('balance',0)

  const newExpenditure: Expenditure = reactive({
        date: '',
        description:'',
        value: 0,
      })

  const registerExpenditure = async() => {


    if( balance.value < newExpenditure.value || balance.value <= 0 ) {
      toast.warning('Saldo insuficiente')
      return
    }

    try {
      const { data } = await registrationExpenditure(newExpenditure);

      if (data.title) {

        balance.value = balance.value - newExpenditure.value
        newExpenditure.date =  ''
        newExpenditure.description =''
        newExpenditure.value = 0
        toast.success(`${data.title}  ${data.description}`)
      } else {
        toast.error('Nuevo gasto no registrado')
      }

    } catch (error) {
      throw new Error(`Error new register sale: ${error}`)
    }

  }





  </script>
