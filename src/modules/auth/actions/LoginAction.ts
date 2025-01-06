import { apiFinansas } from "@/api/api_finansas"
import type { AuthResponse } from "../interfaces/authResponse";
import { isAxiosError } from "axios";

interface LoginError {
  title: string
  description: string
}
interface LoginSuccess {
  token: string
  }


export const loginAction = async (username: string, password: string)
:Promise<LoginSuccess | LoginError> => {

  try {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const { data } = await apiFinansas.post<AuthResponse>('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return {
      token: data.token
    }
  } catch (error) {
    if ( isAxiosError(error) && error.response?.status === 401 ) {
      return {
        title: error.response?.data.title,
        description: error.response?.data.description
      }
  }

  console.log(error)
  throw new Error('No se pudo realizar la peticion')
  }




}
