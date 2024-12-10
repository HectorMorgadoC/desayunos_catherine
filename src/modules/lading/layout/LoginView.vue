<template>
<BrowserView />
<div class="flex items-center justify-around">
  <div class="flex items-center justify-center ">
  <form action="" class="rounded-lg space-y-2 ">
    <div>
      <label for="usuario" class="block text-sm font-medium text-blue-700">Ingrese Usuario</label>
      <input
        id="usuario"
        type="text"
        class="background_all h-1/3 mt-1 w-full px-2 py-2 border border-solid border-blue-700 rounded-lg text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        placeholder="Usuario"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-blue-700">Ingrese Password</label>
      <input
        id="password"
        type="password"
        class="background_all h-1/3 mt-1 w-full px-3 py-2 border border-solid border-blue-700 rounded-lg text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        placeholder="Password"
      />
    </div>
    <div>
      <input
        type="submit"
        value="Ingresar"
        class="w-full h-8 text-center text-sm text-blue-700 border border-solid border-blue-700 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300 cursor-pointer"
      />
    </div>
  </form>
</div>
      <div class="w-6/12 flex justify-end">
        <img
          class="3xl:h-[600px] 2xl:h-[550px] xl:h-[450px] lg:h-[450px] md:h-[450px] sm:h-[350px]"
          src="../../../img/catherine_pan.png"
          alt="user image"
        />
      </div>
    </div>
    <FooterView />
</template>
<script setup lang="ts">
import BrowserView from '@/views/layout/BrowserView.vue';
import FooterView from '@/views/layout/FooterView.vue';


</script>
