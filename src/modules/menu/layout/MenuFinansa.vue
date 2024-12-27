<template>
  <div class="flex h-screen">
     <nav class="w-64 bg-orange-500 space-y-4">
        <div class="flex flex-col space-y-4 mt-8">
         <RouterLink to="/" class="text-orange-50 p-4 transition-colors duration-300 ease-in-out hover:bg-orange-100 w-full hover:text-orange-500 text-center">Productos</RouterLink>
         <RouterLink to="/" class="text-orange-50 p-4 transition-colors duration-300 ease-in-out hover:bg-orange-100 w-full hover:text-orange-500 text-center">Ingresos</RouterLink>
         <RouterLink to="/" class="text-orange-50 p-4 transition-colors duration-300 ease-in-out hover:bg-orange-100 w-full hover:text-orange-500 text-center">Egresos</RouterLink>
         <RouterLink to="/" class="text-orange-50 p-4 transition-colors duration-300 ease-in-out hover:bg-orange-100 w-full hover:text-orange-500 text-center">Creditos</RouterLink>
        </div>
     </nav>
     <div class="flex-1 flex flex-col bg-orange-100 p-4">
       <div class="mb-8 p-6 rounded-lg">
           <div class="flex gap-8 items-center">
               <div class="flex-grow">
                   <h1 class="text-3xl font-bold mb-4 text-orange-300">Saldo actual</h1>
                   <p2 class="text-3xl text-orange-500">{{ credit }} soles</p2>
               </div>
           </div>
       </div>
       <div class="mt-auto">
           <FooterView />
       </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import FooterView from '@/modules/views/layout/FooterView.vue';
import { ref } from 'vue';

const credit = ref(0)

</script>
