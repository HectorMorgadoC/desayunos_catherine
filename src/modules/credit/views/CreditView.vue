<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
  :connection="false"
  :message="'Creditos'"
  />
  <div >
      <div
      v-if="!stateCreditCancelled"
      class="flex flex-row justify-center gap-16 my-8">
        <div>
          <ul class="rounded-box w-56">
            <li class="flex items-center">
              <RouterLink
              :to="{name: 'creditRegistration'}"
              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Registrar credito </RouterLink></li>
            <li class="flex items-center">
              <button
              @click="RegisterCreditCancelled()"
              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Cancelar credito </button></li>
            <li class="flex items-center"><RouterLink
              :to="{ name: 'creditCancelled'}"

              class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Creditos cancelados </RouterLink></li>
          </ul>
        </div>

        <div class="mr-32 pr-16">
          <div>
            <form @submit.prevent="dateRegister">
              <div class="flex justify-center items-start gap-4 mb-8">
                <input
                type="date"
                class="background_all w-48 px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                v-model="dateCredit.date"
                />

                <button
                class="w-48 h-10 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                >consultar</button>
              </div>

            </form>

          </div>
          <div class="flex flex-col item-center justify-center mb-48">
            <div
            class="flex justify-center"
            >
            <p
            class="text-2xl text-orange-400"
            v-if="messageStatus">No hay registro con la fecha</p>
              <table v-else-if="!messageStatus && credit.length > 0"
              class="w-full mt-6 bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr
              class="bg-yellow-400 text-white"
              >
                <th
                class="py-2 px-4 text-left"
                >Fecha</th>
                <th
                class="py-2 px-4 text-left"
                >Producto</th>
                <th
                class="py-2 px-4 text-left"
                >Cantidad</th>
                <th
                class="py-2 px-4 text-left"
                >Nombre de acreditador</th>
                <th
                class="py-2 px-4 text-left"
                >Total</th>
                <th
                class="py-2 px-4 text-left"
                >Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( saleCredit, index ) in credit "
              :key="index"
              :class="{'bg-yellow-100': index % 2 === 0}"
              >
                <td
                class="px-4 py-2 text-red-500"
                >{{ saleCredit.date }}</td>
                <td
                class="px-4 py-2 text-red-500"
                >{{ saleCredit.description_product }}</td>
                <td
                class="px-4 py-2 text-red-500"
                >{{ saleCredit.quantity }}</td>
                <td
                class="px-4 py-2 text-red-500"
                >{{ saleCredit.creditor_name }}</td>
                <td
                class="px-4 py-2 text-red-500"
                >{{ saleCredit.total_price }} /s</td>
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
  <FooterView />
  </div>

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
