<template>
  <BrowserView
  :connection="false"
  :message="'Ingresos'"
  />
  <div class="max-w-6xl h-full">
      <div class="flex-col gap-14 items-center justify-center">
        <div class="flex items-center justify-center">
          <ul class="rounded-box w-56 flex gap-4">
            <li class="flex items-center" >
              <RouterLink :to="{ name: 'sale' }"
            class="w-32 p-2 text-center mt-4 bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"> Ventas </RouterLink></li>
            <li
            class="flex items-center"
            >
            <RouterLink
            :to="{ name: 'credit' }"
            class="w-32 p-2 text-center mt-4 bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"> Creditos </RouterLink></li>
            <li
            class="flex items-center"><button
              @click="deleteIncomeRecordById"
              class="w-32 p-2  text-center mt-4 bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"> Eliminar ingreso </button></li>
          </ul>
        </div>
        <div>
          <div>

            <form @submit.prevent="dateRegister">
              <label class="block text-lg font-medium text-orange-600 mb-2">
              Ingrese fecha
              </label>
              <div class="flex items-center gap-4 mb-2">
                <input
                type="date"
                class="background_all h-1/3 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                v-model="dateIncome.date"
                />

                <button
                class="w-full h-10 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                >consultar</button>
              </div>

            </form>

          </div>
          <div class="overflow-x-auto">
              <p v-if="messageStatus">No hay registro con la fecha</p>
              <table v-else
              class="w-64 bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr
              class="bg-yellow-400 text-white"
              >
                <th
                class="py-2 px-4 text-left"
                >Fecha</th>
                <th
                class="py-2 px-4 text-left"
                >Tipo de ingreso</th>
                <th
                class="py-2 px-4 text-left"
                >Ingreso</th>
                <th
                class="py-2 px-4 text-left"
                >Verificar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( incomeData, index ) in income "
              :key="index"
              :class="{'bg-yellow-100': index % 2 === 0}"
              >
                <td
                class="px-4 py-2 text-red-500"
                >{{ incomeData.date }}</td>
                <td
                class="px-4 py-2 text-red-500"
                >{{ incomeData.income_type }}</td>
                <td
                class="px-4 py-2 text-red-500"
                >{{ incomeData.value }} /s</td>
                <td><input
                  v-model="incomeData.status"
                  type="checkbox"
                  :disabled="isOtherChecked(incomeData)"
                  /></td>
              </tr>
              <tr>
                <td>
                  {{ totalIncome }} /s
                </td>
              </tr>
            </tbody>
          </table>

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
    import { getIncomeForDate } from '../actions/getIncomeForDate-action';
    import type { Income } from '../interface/income-interface';
    import { useToast } from 'vue-toastification';
    import { deleteIncomeById } from '../actions/deleteIncome-action';

    const dateIncome = reactive({
        date: ''
    })

    const toast = useToast()
    const income = ref<Income[]>([])
    const messageStatus = ref<boolean>(false)
    const totalIncome = ref<number>(0)
    const dateRegister = async () => {
      try {
        const { data } = await getIncomeForDate(dateIncome.date)
        messageCondition(data)
        income.value = data
        totalIncome.value = totalValueIncome(income.value)
      } catch (error) {
        throw new Error(`Error en datos de ingreso: ${error}`)

      }

    }


    const deleteIncomeRecordById = async() => {
      const idIncomeDelete = income.value.find( s => s.status)
      const id = idIncomeDelete ? idIncomeDelete.id : ''
      if (id) {
        try {
          // esto hay que mejorar para que no realice redireccion ni muestre mns cuando exista un
          const { data } = await deleteIncomeById(id)
          toast.success('Registro de venta eliminado',{
            timeout: 3000,
            onClose: () => {
              window.location.reload()
            }
          })

        } catch (error) {
          toast.error('Error al eliminar registro')
          throw new Error(`${error}`)
        }
      }
      }

    const messageCondition = (income: Income[]) => {
      if( income.length <= 0 ) {
      messageStatus.value = true
    } else {
      messageStatus.value = false
    }
    }

    const totalValueIncome = (income: Income[] ): number => {
      let totalIncome = 0
      income.map( i => {
        totalIncome = totalIncome + i.value
      })

      return totalIncome
    }
    const isOtherChecked = (registerIncome: Income) => {
      return income.value.some(u => u.status && u !== registerIncome);
                };

</script>
