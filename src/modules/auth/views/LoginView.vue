<template>
<BrowserView />
<div class="max-w-6xl mx-auto p-4 h-screen mt-8">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-center">
        <!-- Contenedor de formulario -->
        <div class="flex-grow">
          <form action="" class="rounded-lg space-y-2 px-10">
    <div>
      <label for="usuario" class="block text-sm font-medium text-orange-600">Ingrese Usuario</label>
      <input
        id="usuario"
        type="text"
        class="background_all h-1/3 mt-1 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
        placeholder="Usuario"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-orange-600">Ingrese Password</label>
      <input
        id="password"
        type="password"
        class="background_all h-1/3 mt-1 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 "
        placeholder="Password"
      />
    </div>
    <div>
      <input
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
import BrowserView from '@/modules/views/layout/BrowserView.vue';
import FooterView from '@/modules/views/layout/FooterView.vue';


</script>
