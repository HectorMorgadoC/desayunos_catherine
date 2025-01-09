import { apiFinansas } from "@/api/api_finansas";
import router from "@/router";
import { useLocalStorage } from "@vueuse/core";
import { isAxiosError } from "axios";

const token = useLocalStorage('token', null).value;

export const RegistrationProduct = async( description: string, value: number) => {

  if (!token) {
    router.push({ name: 'lading' });
    return {
        message: 'Usuario no autenticado',
        status: 403
    };
  }

  try {
    const { data, status } = await apiFinansas.post('/finance/product',
      {
        description,
        value
      },
      {
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
        }
      })

      console.log(status)
      return {
        data
      }
  } catch (error) {

    if (isAxiosError(error) && error.response?.status === 403) {
      return {
          message: 'Token inválido o expirado',
          status: 403
      };
  }

  console.error(error);
  router.push({ name: 'login' });
  throw new Error('No se pudo realizar el registro del producto');

  }


}
