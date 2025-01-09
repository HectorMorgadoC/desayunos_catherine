<template>

<BrowserView
  :connection="false"
  :message="'Registrar producto'"
  />
  <div class="min-h-screen mx-auto p-4 mt-2">
    <div class="mb-8 p-6 rounded-lg">
      <div class="flex gap-8 items-start">
        <div>
          <ul class="menu rounded-box w-56">
            <li class="flex items-center">
              <button
              class="w-full px-6 py-1 text-white bg-orange-300 mb-2 text-center flex items-center justify-center"
              > Registrar </button>
            </li>
          </ul>

        </div>
        <div>
            <form
            @submit.prevent="registerProduct"
            >
              <div class="flex flex-col">
                <label class="">Ingrese la descripcion del producto</label>
                <input
                v-model="newProduct.description"
                class=""
                type="text"
                placeholder="Descripcion de producto"
                required
                >
                <label class="">Ingrese el valor del producto</label>
                <input
                v-model="newProduct.value"
                class=""
                type="text"
                placeholder="ingrese precio"
                required
                >
                <button class=""
                @submit.prevent=""
                type="submit"
                >registrar</button>
              </div>
          </form>
          </div>
      </div>
    </div>

  </div>
  <FooterView />
</template>

<script setup lang="ts">
  import BrowserView from '@/views/layout/BrowserView.vue';
  import FooterView from '@/modules/views/layout/FooterView.vue';
import { reactive } from 'vue';
import { RegistrationProduct } from '../actions/createProduct-action';


const newProduct = reactive({
      description: '',
      value:0
    })


const registerProduct = () => {
  const newRegisterProduct = RegistrationProduct(newProduct.description, newProduct.value);
  console.log(newRegisterProduct)
}
</script>
