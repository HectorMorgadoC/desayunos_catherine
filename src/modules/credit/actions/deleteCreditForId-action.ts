import { apiFinansas } from "@/api/api_finansas";
import router from "@/router";
import { useLocalStorage } from "@vueuse/core";
import { AxiosError } from "axios";
import { useToast } from "vue-toastification";
import type { CreditCancelled } from "../interface/credit";


export const deleteCreditById = async(registerCreditCancelled: CreditCancelled) => {

  const token = useLocalStorage('token', null).value

  if (!token) {
    router.push({ name: 'landing' })
    return {
      message: 'Usuario no autenticado',
      status: 403
    }
  }

  try {

    await apiFinansas.delete(`/finance/income/credit/`, {
      data: {
        id: registerCreditCancelled.id,
        registration_date: registerCreditCancelled.registration_date,
        cancellation_date: registerCreditCancelled.cancellation_date,
        description_product: registerCreditCancelled.description_product,
        total_price: registerCreditCancelled.total_price,
        creditor_name: registerCreditCancelled.creditor_name,
        payment_method: registerCreditCancelled.payment_method
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })



  } catch (error) {
    if (error instanceof AxiosError) {

      if (error.response?.status === 400) {
        const toast = useToast()
        toast.error("Error al eliminar venta")
        return {
          message: 'Delete data register sale',
          status: 400
        }
      }

      if (error.response?.status === 403) {
        router.push({ name: 'login' })
        return {
          message: 'Token inválido o expirado',
          status: 403
        }
      }

      if (error.response?.status === 401) {
        router.push({ name: 'login' })
        return {
          message: 'No autorizado',
          status: 401
        }
      }
    }

    // Error general
    console.error('Error al eliminar venta:', error)
    return {
      message: 'No se pudo eliminarla venta',
      status: 500
    }
  }
  }
