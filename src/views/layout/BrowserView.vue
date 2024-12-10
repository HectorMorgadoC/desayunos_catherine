<template>
  <nav
    class="container px-6 mx-auto md:flex md:justify-end md:items-center p-4"
    >
    <ul
      class="flex-col items-end mt-8 space-y-2 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
    >
      <li class="flex items-center justify-center px-2 py-1 border border-solid border-blue-700 rounded-lg text-blue-700 hover:bg-blue-400 hover:text-white"><RouterLink :to="{name: 'login'}" class="text-xs">Iniciar seccion</RouterLink></li>
    </ul>
  </nav>
</template>
