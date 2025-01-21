<template>
  <BrowserView
  :connection="false"
  :message="'Gastos'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center"><RouterLink :to="{ name: 'expenditureRegistration' }" class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Registrar Gastos </RouterLink></li>
            <li class="flex items-center"><ModalRegister
              :onSecondaryAction="() => deleteTotalExpenditure"
              :message="'Eliminar regitros'"
              @click="deleteMessageStatus = false"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Eliminar Gastos </ModalRegister></li>
          </ul>
        </div>
        <div v-if="deleteMessageStatus">
          <div>

            <form @submit.prevent="dateRegister">
              <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text text-orange-300">Ingrese la fecha</span>
              </div>
              </label>
              <div class="flex">
                <input
                type="date"
                placeholder="Type here"
                class="background_all px-2 py-1 text-sm border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                v-model="dateExpenditure.date"
                />

                <button
                @click="getExpenditureForDate(dateExpenditure.date)"
                class="ml-5 py-1 px-2 text-sm border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >consultar</button>
              </div>

            </form>

          </div>
          <div class="overflow-x-auto">
              <p v-if="messageStatus">No hay registro con la fecha</p>
              <table v-else class="table table-zebra">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo de ingreso</th>
                <th>ingreso</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( data, index ) in expenditure " :key="index">
                <td>{{ data.date }}</td>
                <td>{{ data.description }}</td>
                <td>{{ data.value }} /s</td>
              </tr>
              <tr>
                <td>
                  {{ totalExpenditure }} /s
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
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
