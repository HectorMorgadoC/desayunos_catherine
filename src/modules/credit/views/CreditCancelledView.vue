

<template>
  <BrowserView
  :connection="false"
  :message="'Creditos Cancelados'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
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
                v-model="dateCredit.date"
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
                <th>Solicitante de credito</th>
                <th>Fecha de solicitud</th>
                <th>Fecha de pago</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Metodo de pago</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( register, index ) in creditCancelled " :key="index">
                <td>{{ register.creditor_name }}</td>
                <td>{{ register.registration_date }}</td>
                <td>{{ register.cancellation_date }}</td>
                <td>{{ register.description_product }}</td>
                <td>{{ register.total_price }} /s</td>
                <td>{{ register.payment_method }}</td>
              </tr>
            </tbody>
          </table>

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
    import type { CreditCancelled } from '../interface/credit';
    import { getCreditCancelledByDate } from '../actions/getCreditByDate-action';

    const dateCredit = reactive({
        date: ''
    })

    const toast = useToast()
    const creditCancelled = ref<CreditCancelled[]>([])
    const messageStatus = ref<boolean>(false)


    const dateRegister = async () => {
      try {
        const { data } = await getCreditCancelledByDate(dateCredit.date)
        messageCondition(data)
        creditCancelled.value = data
      } catch (error) {
        toast.error('Error: Problemas en solicitud')
        throw new Error(`Error en datos de ingreso: ${error}`)

      }

    }

    const messageCondition = (credit: CreditCancelled[]) => {
      if( credit.length <= 0 ) {
      messageStatus.value = true
      } else {
        messageStatus.value = false
      }
    }

</script>
