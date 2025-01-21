// api/products.ts
import { apiFinansas } from "@/api/api_finansas"
import router from "@/router"
import { useLocalStorage } from "@vueuse/core"
import { AxiosError } from "axios"
import { useToast } from "vue-toastification"
import type { Sale } from "@/modules/sale/interface/sale"

interface SaleResponse {
	title: string,
	description: string
}

interface ErrorRequest {
  message: string,
  status: number
}

export const RegistrationSale = async (
    sale: Sale
): Promise<SaleResponse | ErrorRequest > => {
  const token = useLocalStorage('token', null).value

  if (!token) {
    router.push({ name: 'landing' })
    return {
      message: 'Usuario no autenticado',
      status: 403
    }
  }

  try {
    const { data } = await apiFinansas.post<SaleResponse>(
      '/finance/income/sale',
      {
      date: sale.date,
      description_product: sale.description_product,
      quantity: sale.quantity,
      payment_method: sale.payment_method,
      total_price: sale.total_price
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
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
        toast.error("Error de registro de producto")
        return {
          message: 'Error data register product',
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
    console.error('Error al registrar producto:', error)
    return {
      message: 'No se pudo realizar el registro del producto',
      status: 500
    }
  }
}
