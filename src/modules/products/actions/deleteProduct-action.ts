import { apiFinansas } from "@/api/api_finansas";
import router from "@/router";
import { useLocalStorage } from "@vueuse/core";
import { AxiosError } from "axios";
import { useToast } from "vue-toastification";


export const deleteProduct = async(id: string) => {

  const token = useLocalStorage('token', null).value

  if (!token) {
    router.push({ name: 'landing' })
    return {
      message: 'Usuario no autenticado',
      status: 403
    }
  }

  try {

    const { data } = await apiFinansas.delete(`/finance/product/${id}`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return {
      data
    }

  } catch (error) {
    if (error instanceof AxiosError) {

      if (error.response?.status === 400) {
        const toast = useToast()
        toast.error("Error al eliminar producto")
        return {
          message: 'Delete data register product',
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
    console.error('Error al eliminar producto:', error)
    return {
      message: 'No se pudo eliminar el producto',
      status: 500
    }
  }
  }



