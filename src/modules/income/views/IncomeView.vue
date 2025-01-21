<template>
  <BrowserView
  :connection="false"
  :message="'Ingresos'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center"><RouterLink :to="{ name: 'sale' }"  class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Ventas </RouterLink></li>
            <li class="flex items-center"><RouterLink :to="{ name: 'credit' }" class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Creditos </RouterLink></li>
            <li class="flex items-center"><button
              @click="deleteIncomeRecordById"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Eliminar ingreso </button></li>
          </ul>
        </div>
        <div>
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
                v-model="dateIncome.date"
                />

                <button
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
              <tr v-for="( incomeData, index ) in income " :key="index">
                <td>{{ incomeData.date }}</td>
                <td>{{ incomeData.income_type }}</td>
                <td>{{ incomeData.value }} /s</td>
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
