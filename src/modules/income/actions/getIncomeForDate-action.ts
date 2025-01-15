import { apiFinansas } from "@/api/api_finansas";
import router from "@/router";
import { useLocalStorage } from "@vueuse/core";
import { AxiosError } from "axios";
import { useToast } from "vue-toastification";


export const getIncomeForDate = async(date: string) => {

  const token = useLocalStorage('token', null).value

  if (!token) {
    router.push({ name: 'landing' })
    return {
      message: 'Usuario no autenticado',
      status: 403
    }
  }



  try {

    const { data } = await apiFinansas.get(`finance/income/${date}`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return {
      data
    }

  } catch (error) {
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
      message: 'No se pudo realizar la peticion de los ingresos',
      status: 500
    }
  }
  }



