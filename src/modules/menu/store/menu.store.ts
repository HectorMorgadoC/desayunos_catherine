import { useLocalStorage } from "@vueuse/core"
import { dataMenu } from "../actions/menuAction"
import { defineStore } from "pinia"
import type { Product, PaymentMethod } from "../interface/menuData"
import { ref } from "vue"

export const useMenuStore = defineStore("menu", () => {
  const product = useLocalStorage<Product[]>('product', [])
  const payment_method = useLocalStorage<PaymentMethod[]>('payment_method', [])
  const balance = useLocalStorage('balance', 0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const descriptionMenu = async() => {
    isLoading.value = true
    error.value = null

    try {
      const listMenu = await dataMenu()
      console.log(listMenu)
      // Primero verificamos si hay mensaje de error
      if ('message' in listMenu) {
        throw new Error(listMenu.message)
      }

      // Si no hay error, actualizamos los datos

      product.value = listMenu.product
      payment_method.value = listMenu.payment_method
      balance.value = listMenu.balance

    } catch (err) {
      error.value = `No se pudo obtener el menú: ${(err as Error).message}`
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    product,
    payment_method,
    balance,
    isLoading,
    error,
    descriptionMenu
  }
})
