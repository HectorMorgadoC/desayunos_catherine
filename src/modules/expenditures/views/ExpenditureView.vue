<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
  :connection="false"
  :message="'Gastos'"
  />
  <div class="flex flex-row justify-center gap-16 my-8">
      <div class="">
          <ul class="rounded-box w-56">
            <li
            class="flex items-center">
            <RouterLink :to="{ name: 'expenditureRegistration' }"
            class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Registrar Gastos </RouterLink></li>
            <li class="flex items-center"><ModalRegister
              :onSecondaryAction="() => deleteTotalExpenditure"
              :message="'Eliminar regitros'"
              
              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Eliminar Gastos </ModalRegister></li>
          </ul>
      </div>

        <div
        v-if="deleteMessageStatus"
        class="mr-32 pr-16"
        >
          <div>

            <form @submit.prevent="dateRegister">
              <div class="flex justify-center items-start gap-4 mb-8">
                <input
                type="date"
                placeholder="Type here"
                class="background_all w-48 px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                v-model="dateExpenditure.date"
                />

                <button
                @click="getExpenditureForDate(dateExpenditure.date)"
                class="w-48 h-10 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                >consultar</button>
              </div>

            </form>

          </div>
          <div class="overflow-x-auto">
              <div class="flex justify-center">
                <p
                v-if="messageStatus"
                class="text-2xl text-orange-400"
                >No hay registro con la fecha</p>
                <div v-else-if="!messageStatus && expenditure.length > 0">
                <table  class="w-full mt-6 bg-white border border-gray-300 shadow-md rounded-lg">
                  <thead>
                    <tr class="bg-yellow-400 text-white">
                      <th class="py-2 px-4 text-left">Fecha</th>
                      <th class="py-2 px-4 text-left">Descripcion</th>
                      <th class="py-2 px-4 text-left">Costo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="( expenditureData, index ) in expenditure "
                    :key="index"
                    :class="{'bg-yellow-100': index % 2 === 0}"
                    >
                      <td class="px-4 py-2 text-red-500">{{ expenditureData.date }}</td>
                      <td class="px-4 py-2 text-red-500">{{ expenditureData.description }}</td>
                      <td class="px-4 py-2 text-red-500">{{ expenditureData.value }} /s</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
              <div class="flex justify-center mt-8 text-2xl text-orange-400">
              <p
              v-if="!messageStatus && expenditure.length > 0"
              >
                Gastos del dia: {{ totalExpenditure }} /s
          </p >
            </div>


        </div>
        </div>

  </div>

  <FooterView />
  </div>

</template>

<script setup lang="ts">
    import BrowserView from '@/modules/views/layout/BrowserView.vue';
    import FooterView from '@/modules/views/layout/FooterView.vue';
    import { reactive, ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import type { Expenditure } from '../interface/expenditure';
    import { getExpenditureForDate } from '../actions/getExpenditure-action';
    import { deleteTotalExpenditure } from '../actions/deleteExpenditure-action';
    import ModalRegister from '@/modules/products/components/ModalRegister.vue';

    const dateExpenditure = reactive({
        date: ''
    })

    const toast = useToast()
    const expenditure = ref<Expenditure[]>([])
    const messageStatus = ref<boolean>(false)
    const deleteMessageStatus = ref<boolean>(true)
    const totalExpenditure = ref<number>(0)


    const dateRegister = async () => {
      try {
        const { data } = await getExpenditureForDate(dateExpenditure.date)
        messageCondition(data)
        expenditure.value = data
        totalExpenditure.value = totalValueIncome(expenditure.value)
      } catch (error) {
        toast.error('Error en solicitud de gastos')
        throw new Error(`Error en solicitud de gastos: ${error}`)
      }

    }

    const messageCondition = (expenditure: Expenditure[]) => {
      if( expenditure.length <= 0 ) {
      messageStatus.value = true
    } else {
      messageStatus.value = false
    }
    }

    const totalValueIncome = (expenditure: Expenditure[] ): number => {
      let totalIncome = 0
      expenditure.map( i => {
        totalIncome = totalIncome + i.value
      })

      return totalIncome
    }
</script>
