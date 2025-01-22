<script setup lang="ts">
import ImageBanner from '@/modules/image/ImageBanner.vue';
</script>

<template>
  <div class="max-w-6xl h-full mx-auto p-4 mt-8">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-center">
        <div class="flex-grow">
          <h1 class="text-4xl font-bold mb-4 text-orange-400">Hola te doy la bienvenida al sabor guariqueño</h1>
          <h2 class="text-2xl text-orange-500">Empieza tu dia con un rico desayuno</h2>
        </div>
         <!-- Contenedor de Imagen -->
         <ImageBanner/>

      </div>
    </div>
  </div>
</template>

