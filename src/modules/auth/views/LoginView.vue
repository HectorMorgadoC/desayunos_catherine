<template>
<BrowserView
:connection = 'false'
:message = "'Ingreso de usuario'" />
<div class="max-w-6xl h-full mx-auto p-4 mt-8">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-center">
        <div class="flex-grow">
          <form @submit.prevent="onLogin" class="rounded-lg space-y-2 px-6">
            <div>
              <label for="usuario" class="block text-sm font-medium text-orange-600">Ingrese Usuario</label>
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
              <label for="password" class="block text-sm font-medium text-orange-600">Ingrese Password</label>
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
                class="w-full h-10 text-center text-sm text-orange-600 border border-solid border-orange-600 rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent"
              >Acesso</button>
            </div>
  </form>
        </div>
        <ImageBanner />
      </div>
      <div class="h-full p-6">
      </div>
    </div>
  </div>
    <FooterView />
</template>
<script setup lang="ts">
import FooterView from '@/modules/views/layout/FooterView.vue';
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import ImageBanner from '@/modules/image/ImageBanner.vue';
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
