
<template>
  <BrowserView
  :connection="false"
  :message="'Ventas'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center"><RouterLink :to="{name: 'saleRegistration'}"  class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Registrar venta </RouterLink></li>
            <li class="flex items-center"><button
              @click="deleteSalesRecordById"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Eliminar venta </button></li>
            <li class="flex items-center"><button
              @click="deleteSalesRecordByDate"
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Eliminar ventas </button></li>
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
                v-model="dateSale.date"
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
                <th>Metodo de pago</th>
                <th>Total</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( saleData, index ) in sale " :key="index">
                <td>{{ saleData.date }}</td>
                <td>{{ saleData.description_product }}</td>
                <td>{{ saleData.quantity }}</td>
                <td>{{ saleData.payment_method }}</td>
                <td>{{ saleData.total_price }} /s</td>
                <td><input
                  v-model="saleData.status"
                  type="checkbox"
                  :disabled="isOtherChecked(saleData)"
                  /></td>

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
    import { reactive, ref } from 'vue';
    import { getSaleForDate } from '../actions/getSaleByDate-action';
    import type { Sale } from '../interface/sale'
    import { deleteSaleBydate, deleteSaleById } from '../actions/deleteSaleForId-action';
    import { useToast } from 'vue-toastification';


    const dateSale = reactive({
        date: ''
    })

    const toast = useToast()
    const sale = ref<Sale[]>([])
    const messageStatus = ref<boolean>(false)

    const dateRegister = async () => {
      try {
        const { data } = await getSaleForDate(dateSale.date)
        messageCondition(data)
        sale.value = data
      } catch (error) {
        throw new Error(`Error en datos de ingreso: ${error}`)

      }

    }

    const messageCondition = (sale: Sale[]) => {
      if( sale.length <= 0 ) {
      messageStatus.value = true
      } else {
        messageStatus.value = false
      }
    }

    const deleteSalesRecordById = async() => {
      const idSaleDelete = sale.value.find( s => s.status)
      const id = idSaleDelete ? idSaleDelete.id : ''
      if (id) {
        try {
          // esto hay que mejorar para que no realice redireccion ni muestre mns cuando exista un
          const { data } = await deleteSaleById(id)
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
      const deleteSalesRecordByDate = async() => {
        const date = dateSale.date

      try {
        const { data } = await deleteSaleBydate(date)
        toast.success('Registros de ventas eliminados',{
          timeout: 3000,
          onClose: () => {
            window.location.reload()
          }
        })
      } catch (error) {
        throw new Error(`${error}`)
      }



      }

    const isOtherChecked = (registerSale: Sale) => {
      return sale.value.some(u => u.status && u !== registerSale);
                };


</script>
