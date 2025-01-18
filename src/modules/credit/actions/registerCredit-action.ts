// api/products.ts
import { apiFinansas } from "@/api/api_finansas"
import router from "@/router"
import { useLocalStorage } from "@vueuse/core"
import { AxiosError } from "axios"
import { useToast } from "vue-toastification"
import type { Credit } from "../interface/credit"

interface CreditResponse {
	title: string,
	description: string
}

interface ErrorRequest {
  message: string,
  status: number
}

export const RegistrationCredit = async (
    credit: Credit
): Promise<CreditResponse | ErrorRequest > => {
  const token = useLocalStorage('token', null).value

  if (!token) {
    router.push({ name: 'landing' })
    return {
      message: 'Usuario no autenticado',
      status: 403
    }
  }

  try {
    const { data } = await apiFinansas.post<CreditResponse>(
      '/finance/income/credit',
      {
      date: credit.date,
      description_product: credit.description_product,
      quantity: credit.quantity,
      total_price: credit.total_price,
      creditor_name: credit.creditor_name
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      },
    )

    return {
      title: data.title,
      description: data.description
    }

  } catch (error) {
    // Manejo específico de errores
    if (error instanceof AxiosError) {

      if (error.response?.status === 400) {
        const toast = useToast()
        toast.error("Error de registro de credito")
        return {
          message: 'Error data register credit',
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
    console.error('Error al registrar credito:', error)
    return {
      message: 'No se pudo realizar el registro del credito',
      status: 500
    }
  }
}
