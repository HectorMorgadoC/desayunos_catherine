import { apiFinansas } from "@/api/api_finansas";
import type { DataMenu, MenuError } from "../interface/menuData";
import { useLocalStorage } from "@vueuse/core";
import router from "@/router";
import { isAxiosError } from "axios";

const token = useLocalStorage('token', null).value;


export const dataMenu = async(): Promise<DataMenu | MenuError> => {
    try {
        if (!token) {
            router.push({ name: 'login' });
            return {
                message: 'Usuario no autenticado',
                status: 401
            };
        }

    const { data } = await apiFinansas.get('/finance/', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        timeout: 10000
    });

        return {
            balance: data.balance,
            product: data.product,
            payment_method: data.payment_method
        };
    }
    catch (error) {
        if (isAxiosError(error) && error.response?.status === 403) {
            return {
                message: 'Token inválido o expirado',
                status: 403
            };
        }

        console.error(error);
        router.push({ name: 'login' });
        throw new Error('No se pudo realizar la petición');

    }
};
