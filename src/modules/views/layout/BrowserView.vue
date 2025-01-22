<template>
  <header class="p-5 w-screen h-100">
      <ul
      class="mt-8 mr-5 space-y-2 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 transition-colors md:justify-end"
    >
      <li
      v-if="connection"
      class="py-1 px-2 bg-yellow-400  rounded-lg text-white hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer hover:shadow">
      <RouterLink :to="{name: 'login'}" class="text-sm">Iniciar seccion</RouterLink></li>
      <p
      class="text-lg text-red-500"
      v-else>{{ message }}</p>
    </ul>
    </header>
</template>

<script setup lang="ts">

interface Props {
  connection: boolean,
  message: string
}

defineProps<Props>()

</script>
