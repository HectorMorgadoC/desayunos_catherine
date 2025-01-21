<template>

  <BrowserView
    :connection="false"
    :message="'Registrar gastos'"
    />
    <div class="min-h-screen mx-auto p-4 mt-2">
      <div class="mb-8 p-6 rounded-lg">
        <div class="flex gap-8 items-start">
          <div>
              <form
              @submit.prevent="registerExpenditure"
              >
                <div class="flex flex-col">
                  <label class="">Fecha</label>
                  <input
                  v-model="newExpenditure.date"
                  class=""
                  type="date"
                  required
                  >
                <label >Descripcion</label>
                  <input
                  v-model="newExpenditure.description"
                  class=""
                  type="text"
                  placeholder="Ingrese descripcion"
                  required
                  >
                <label >Metodo de pago</label>
                  <input
                  v-model="newExpenditure.value"
                  class=""
                  type="text"
                  required
                  >
                  <button class=""
                  @submit.prevent="registerExpenditure"
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
    import { reactive } from 'vue';
    import { useToast } from 'vue-toastification'
    import type { Expenditure } from '../interface/expenditure';
    import { registrationExpenditure } from '../actions/registerExpenditure-action';


  const toast = useToast()

  const newExpenditure: Expenditure = reactive({
        date: '',
        description:'',
        value: 0,
      })

  const registerExpenditure = async() => {

    try {

      console.log(newExpenditure)
      const newRegisterExpenditureData = await registrationExpenditure(newExpenditure);


      if ('description' in newRegisterExpenditureData) {
        const { description } = newRegisterExpenditureData
        newExpenditure.date =  ''
        newExpenditure.description =''
        newExpenditure.value = 0
        toast.success(`${description}`)
      } else {
        toast.error('Nuevo gasto no registrado')
      }

    } catch (error) {
      throw new Error(`Error new register sale: ${error}`)
    }

  }





  </script>
