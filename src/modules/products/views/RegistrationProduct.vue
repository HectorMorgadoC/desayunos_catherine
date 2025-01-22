<template>

    <BrowserView
        :connection="false"
        :message="'Registrar producto'"
        />
    <div class="min-h-screen mx-auto p-4 mt-2">
        <div class="mb-8 p-6 rounded-lg">
            <div class="flex items-start justify-center">
                <div class="px-8 py-10 border-lg">
                        <div class="flex-grow">
                            <form
                            @submit.prevent="registerProduct"
                            class="rounded-lg space-y-2 px-10"
                        >
                            <div class="flex flex-col">
                                <label
                                class="block text-lg font-medium text-orange-600"
                                >Ingrese la descripcion del producto</label>
                                <input
                                    v-model="newProduct.description"
                                    class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    type="text"
                                    placeholder="Descripcion de producto"
                                    required
                                >
                                <label
                                class="block text-lg font-medium text-orange-600 mt-4"
                                >Ingrese el valor del producto</label>
                                <input
                                    v-model="newProduct.value"
                                    class="background_all h-1/3 mt-2 w-full px-2 py-2 border border-solid border-orange-600 rounded-lg text-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    type="text"
                                    placeholder="ingrese precio"
                                    required
                                >
                                <button
                                    class="w-full h-10 mt-4 text-center bg-yellow-400  rounded-lg text-white rounded-lg hover:bg-orange-300 hover:text-white transition duration-300 cursor-pointer hover:border-transparent hover:shadow"
                                    @submit.prevent=""
                                    type="submit"
                                >registrar</button>
                            </div>
                        </form>
                    </div>

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
