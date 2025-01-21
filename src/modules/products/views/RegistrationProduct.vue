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
                type="number"
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
  import BrowserView from '@/modules/views/layout/BrowserView.vue';
  import FooterView from '@/modules/views/layout/FooterView.vue';
import { reactive } from 'vue';
import { RegistrationProduct } from '../actions/createProduct-action';
import { useToast } from 'vue-toastification'

const newProduct = reactive({
      description: '',
      value:0
    })

const registerProduct = async() => {
  const toast = useToast()
  try {
    const newRegisterProductData = await RegistrationProduct(newProduct.description, newProduct.value);

    if ('description' in newRegisterProductData) {
      const { title, description } = newRegisterProductData
      newProduct.description = ''
      newProduct.value = 0
      toast.success(`${title} : ${description}`)
    } else {
      toast.error('Nuevo producto no registrado')
    }

  } catch (error) {
    throw new Error(`Error new register product: ${error}`)
  }

}
</script>
