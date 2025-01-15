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
            <li class="flex items-center"><RouterLink class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Ventas </RouterLink></li>
            <li class="flex items-center"><RouterLink class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Creditos </RouterLink></li>
            <li class="flex items-center"><RouterLink class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Eliminar ingreso </RouterLink></li>
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

                <input type="submit" value="consultar" class="ml-5 py-1 px-2 text-sm border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"/>
              </div>

            </form>

          </div>
          <div class="overflow-x-auto">
          <table class="table table-zebra">

            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>

              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>

              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
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
    import BrowserView from '@/views/layout/BrowserView.vue';
    import FooterView from '@/modules/views/layout/FooterView.vue';
    import { reactive } from 'vue';
import { getIncomeForDate } from '../actions/getIncomeForDate-action';

    const dateIncome = reactive({
        date: ''
    })

    const dateRegister = async() => {
        const { data } = await getIncomeForDate(dateIncome.date)

        console.log(data)
    }

</script>
