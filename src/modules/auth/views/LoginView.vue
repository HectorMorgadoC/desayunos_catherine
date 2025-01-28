<template>
  <div class="flex flex-col min-h-screen">
    <BrowserView
:connection = 'false'
:message = "'Ingreso de usuario'" />
<div class="max-w-6xl h-full mx-auto p-4 mt-8">
    <div class="flex items-center justify-center">
          <div class="px-6 py-10 border-lg">
            <form @submit.prevent="onLogin" class="rounded-lg space-y-2 px-10">
            <div>
              <label
              for="usuario"
              class="block text-lg font-medium text-orange-600">Usuario</label>
              <input
                v-model="myForm.username"
                ref="userNameInputRef"
                id="usuario"
                type="text"
                class="background_all h-1/3 mt-1 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                placeholder="Usuario"
              />
            </div>
            <div>
              <label for="password" class="block text-lg font-medium text-orange-600">Contraseña</label>
              <input
                v-model="myForm.password"
                ref="passwordInputRef"
                id="password"
                type="password"
                class="background_all h-1/3 mt-1 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                value="Ingresar"
                class="w-full h-10 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
              >Acesso</button>
            </div>
          </form>
          </div>
    </div>
  </div>
    <FooterView />
  </div>

</template>
<script setup lang="ts">
import FooterView from '@/modules/views/layout/FooterView.vue';
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';
import { reactive, ref } from 'vue';
import router from '@/router';

const toast = useToast();

const authStore = useAuthStore();

const userNameInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);


const myForm = reactive({
  username: '',
  password: '',
});

const removeStorage = () => {
              window.localStorage.removeItem('token')
              window.localStorage.removeItem('product')
              window.localStorage.removeItem('balance')
              window.localStorage.removeItem('payment_method')
            }

removeStorage()

const onLogin = async () => {

  if (myForm.username === '') {
    return userNameInputRef.value?.focus();
  }


  if (myForm.password.length < 6) {
    return passwordInputRef.value?.focus();
  }

  const ok = await authStore.login(myForm.username, myForm.password);

  if (ok) {
    console.log('ok');
    router.push({ name: 'finance' });
  } else {
    toast.error('Error al iniciar sesión email u contraseña incorrecta');
  }

}
</script>
