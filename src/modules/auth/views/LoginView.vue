<template>
<<<<<<< HEAD
<BrowserView />
<div class="max-w-6xl mx-auto p-4 h-screen mt-8">
=======
<BrowserView
:connection = 'false'
:message = "'Ingreso de usuario'" />
<div class="max-w-6xl mx-auto p-4 mt-8">
>>>>>>> eb334ff (Agregar configuración de entorno, Add environment settings, authentication interfaces, and menus; implement login and menu actions; integrate Vue Query Devtools and Toast; Update routes and views.)
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-center">
        <!-- Contenedor de formulario -->
        <div class="flex-grow">
          <form @submit.prevent="onLogin" class="rounded-lg space-y-2 px-10">
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
      />
    </div>
  </form>
        </div>
         <!-- Contenedor de Imagen -->
        <ImageBanner />
      </div>
    </div>
  </div>
    <FooterView />
</template>
<script setup lang="ts">
import ImageBanner from '@/modules/image/ImageBanner.vue';
<<<<<<< HEAD
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import FooterView from '@/modules/views/layout/FooterView.vue';
=======
import BrowserView from '@/views/layout/BrowserView.vue';
import FooterView from '@/views/layout/FooterView.vue';
import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';
import { reactive, ref } from 'vue';
import router from '@/router';

const toast = useToast();

const authStore = useAuthStore();

const userNameInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
>>>>>>> eb334ff (Agregar configuración de entorno, Add environment settings, authentication interfaces, and menus; implement login and menu actions; integrate Vue Query Devtools and Toast; Update routes and views.)


const myForm = reactive({
  username: '',
  password: '',
});

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
    router.push({ name: 'finansa' });
  } else {
    toast.error('Error al iniciar sesión email u contraseña incorrecta');
  }

}
</script>
