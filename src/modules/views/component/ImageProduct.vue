<template>
  <div class="card bg-base-100 w-full  shadow-xl m-2 rounded-xl overflow-hidden">
     <figure class="w-full h-64">
       <img
         :src="image"
         :alt="image"
         class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
       />
     </figure>
   </div>
 </template>
 <script setup lang="ts">
 interface Props {
   image:string
 }
 defineProps<Props>()
 </script>


