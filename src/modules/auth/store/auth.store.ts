import { defineStore } from "pinia";
import { AuthStatus } from "../interfaces/authStatus";
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { loginAction } from "../actions/LoginAction";

export const useAuthStore = defineStore("auth", () => {

  const authStatus = ref(AuthStatus.Cheking)

  const token = useLocalStorage('token', '')

  const login = async (username: string, password: string): Promise<boolean> => {

    try {
      const loginResponse = await loginAction(username, password)

      if ('token' in loginResponse) {
        token.value = loginResponse.token
        authStatus.value = AuthStatus.Authenticated
        return true
      } else {
        logout()
        return false
      }
    } catch  {
      logout()
      return false
    }


  }

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated
    token.value = ''
  }

  return {
    authStatus,
    token,
    login,

    isCheking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

  }

})


