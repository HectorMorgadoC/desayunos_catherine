<template>
  <BrowserView
  :connection="false"
  :message="'Menu'"
  />
  <div class="max-w-6xl mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center"><RouterLink class="w-40 px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Productos </RouterLink></li>
            <li class="flex items-center"><RouterLink class="w-40 px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Ingresos </RouterLink></li>
            <li class="flex items-center"><RouterLink class="w-40 px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"> Egresos </RouterLink></li>
          </ul>
        </div>
        <!--
        <div>
          <div>

            <form action="">
              <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text text-orange-300">Ingrese la fecha</span>
              </div>
              </label>
              <div class="flex">
                <input type="date" placeholder="Type here" class="background_all px-2 py-1 text-sm border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 " />
                <input type="submit" value="consultar" class="ml-5 py-1 px-2 text-sm border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"/>
              </div>

            </form>

          </div>
          <div class="overflow-x-auto">
          <table class="table table-zebra">

            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>

              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>

              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        -->
        <div>
          <h2 class="text-lg">Saldo</h2>
          <p class="text-lg">{{ balance }}</p>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
</template>

<script setup lang="ts">
import { useMenuStore } from '../store/menu.store';

const menu = useMenuStore()

console.log(menu.product);






</script>
