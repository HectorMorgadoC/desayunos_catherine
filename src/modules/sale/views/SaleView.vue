<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
  :connection="false"
  :message="'Ventas'"
  />
  <div class="flex flex-row justify-center gap-16 my-8">
        <div class="">
            <ul class="rounded-box w-56">
                <li class="flex items-center">
                    <RouterLink
                        :to="{name: 'saleRegistration'}"
                        class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Registrar venta </RouterLink>
                </li>
                <li class="flex items-center">
                    <button
                        @click="deleteSalesRecordById"
                        class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Eliminar venta </button>
                </li>
                <li class="flex items-center">
                    <button
                        @click="deleteSalesRecordByDate"
                        class="w-full rounded-lg px-6 py-2 bg-yellow-400 text-center flex items-center justify-center text-white mb-3 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow"> Eliminar ventas </button>
                </li>
            </ul>
        </div>

        <div class="mr-32 pr-16">
            <div>
                <form @submit.prevent="dateRegister">
                    <div class="flex justify-center items-start gap-4 mb-8">
                        <input
                            type="date"
                            placeholder="Type here"
                            class="background_all w-48 px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                            v-model="dateSale.date"
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
                <div
                    v-else-if="!messageStatus && sale.length > 0"
                >
                    <table
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
                                >Metodo de pago</th>
                                <th
                                    class="py-2 px-4 text-left"
                                >Total</th>
                                <th
                                    class="py-2 px-4 text-left"
                                >Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="( saleData, index ) in sale "
                                :key="index"
                                :class="{'bg-yellow-100': index % 2 === 0}"
                            >
                                <td
                                    class="px-4 py-2 text-red-500"
                                >{{ saleData.date }}</td>
                                <td
                                    class="px-4 py-2 text-red-500"
                                >{{ saleData.description_product }}</td>
                                <td
                                    class="px-4 py-2 text-red-500"
                                >{{ saleData.quantity }}</td>
                                <td
                                    class="px-4 py-2 text-red-500"
                                >{{ saleData.payment_method }}</td>
                                <td
                                    class="px-4 py-2 text-red-500"
                                >{{ saleData.total_price }} /s</td>
                                <td>
                                    <input
                                        v-model="saleData.status"
                                        type="checkbox"
                                        :disabled="isOtherChecked(saleData)"
                                    />
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
  </div>

</template>

<script setup lang="ts">
    import BrowserView from '@/modules/views/layout/BrowserView.vue';
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
