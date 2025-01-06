import { apiFinansas } from "@/api/api_finansas";
import type { DataMenu, MenuError } from "../interface/menuData";
import { useLocalStorage } from "@vueuse/core";
import router from "@/router";
import { isAxiosError } from "axios";

const token = useLocalStorage('token',null).value

export const dataMenu = async():Promise<DataMenu|MenuError > => {

    try {
      if (!token) {
        router.push({ name: 'login' })
      }
      const  { data } = await apiFinansas.get<DataMenu>('/menu',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(data)
      return {
        balance: data.balance,
        product: data.product,
        payment_method: data.payment_method
      }


    }
    catch (error) {
      if ( isAxiosError(error) && error.response?.status === 401 ) {
          return {
            message: 'Usuario o contraseña incorrectos',
            status: 403
          }
      }

      console.log(error)
      throw new Error('No se pudo realizar la peticion')

    }
  }



