

<template>
  <BrowserView
  :connection="false"
  :message="'Creditos'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div
      v-if="!stateCreditCancelled"
      class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center"><RouterLink :to="{name: 'creditRegistration'}"  class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Registrar credito </RouterLink></li>
            <li class="flex items-center">
              <button
              @click="RegisterCreditCancelled()"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Cancelar credito </button></li>
            <li class="flex items-center"><RouterLink
              :to="{ name: 'creditCancelled'}"

              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Creditos cancelados </RouterLink></li>
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
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Nombre de acreditador</th>
                <th>Total</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( saleCredit, index ) in credit " :key="index">
                <td>{{ saleCredit.date }}</td>
                <td>{{ saleCredit.description_product }}</td>
                <td>{{ saleCredit.quantity }}</td>
                <td>{{ saleCredit.creditor_name }}</td>
                <td>{{ saleCredit.total_price }} /s</td>
                <td><input
                  v-model="saleCredit.status"
                  type="checkbox"
                  :disabled="isOtherChecked(saleCredit)"
                  /></td>

              </tr>
            </tbody>
          </table>

        </div>
        </div>
      </div>
      <div v-else>
        <div>
          <p>Fecha de registro: {{ creditCancelled.registration_date }} </p>
          <p>Fecha de pago: {{ creditCancelled.cancellation_date }} </p>
          <p>Nombre: {{ creditCancelled.creditor_name }}</p>
          <p>Producto: {{ creditCancelled.description_product }}</p>
          <p>Total a pagar: {{ creditCancelled.total_price }}</p>
          <select
          v-model="selectPaymentMethod"
          >
            <option value=""
            disabled selected
            >Seleccione un metodo de pago</option>
            <option
            v-for="(p,index) in listPaymentMethod" :key="index"
            :value="p.description" >{{ p.description }}</option>
          </select>
          <button
          @click="deleteCreditRecord"
          >Cancelar credito</button>
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
    import type { Credit, CreditCancelled } from '../interface/credit';
    import { getCreditByDate } from '../actions/getCreditByDate-action';
    import { deleteCreditById } from '../actions/deleteCreditForId-action';
    import { useLocalStorage } from '@vueuse/core';
    import type { PaymentMethod } from '@/modules/menu/interface/menuData';

    const dateCredit = reactive({
        date: ''
    })

    const toast = useToast()
    const credit = ref<Credit[]>([])
    const messageStatus = ref<boolean>(false)
    const listPaymentMethod = useLocalStorage<PaymentMethod[]>('payment_method',[]).value
    const selectPaymentMethod = ref<string>('')
    const stateCreditCancelled = ref<boolean>(false)
    const balance = useLocalStorage('balance',0)

    const creditCancelled = ref<CreditCancelled>({
        id: '',
        registration_date: '',
        cancellation_date: '',
        description_product: '',
        total_price: 0,
        creditor_name: '',
        payment_method: ''
    })

    const dateRegister = async () => {
      try {
        const { data } = await getCreditByDate(dateCredit.date)
        messageCondition(data)
        credit.value = data
      } catch (error) {
        throw new Error(`Error en datos de ingreso: ${error}`)

      }

    }

    const messageCondition = (credit: Credit[]) => {
      if( credit.length <= 0 ) {
      messageStatus.value = true
      } else {
        messageStatus.value = false
      }
    }


    const RegisterCreditCancelled = () => {
      const creditToCancel = credit.value.find( s => s.status)

      if(creditToCancel) {
        creditCancelled.value = {
        id: creditToCancel.id,
        registration_date: creditToCancel?.date,
        cancellation_date: new Date().toISOString().split('T')[0],
        description_product: creditToCancel?.description_product,
        total_price: creditToCancel.total_price,
        creditor_name: creditToCancel.creditor_name,
      }


      stateCreditCancelled.value = true

      } else {
        toast.error('Registro de credito no accinado')
          throw new Error("Error en regsitro de acreditador: no existe")
      }

    }

    const deleteCreditRecord = async() => {
      creditCancelled.value.payment_method = selectPaymentMethod.value
      stateCreditCancelled.value = true

        try {
          // esto hay que mejorar para que no realice redireccion ni muestre mns cuando exista un
          console.log(creditCancelled)
          const { data } = await deleteCreditById(creditCancelled.value)
          balance.value = balance.value + creditCancelled.value.total_price
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


    const isOtherChecked = (registerCredit: Credit) => {
      return credit.value.some(u => u.status && u !== registerCredit);
                };


</script>
