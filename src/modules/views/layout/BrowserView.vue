<template>
  <header class="p-5">
      <ul
      class="mt-8 mr-5 space-y-2 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 transition-colors md:justify-end"
    >
      <li
      class="flex items-start justify-center px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 hover:bg-orange-300 hover:text-white hover:border-transparent duration-400 cursor-pointer">
      <RouterLink :to="{name: 'login'}" class="text-xs">Iniciar seccion</RouterLink></li>
    </ul>
    </header>
</template>
