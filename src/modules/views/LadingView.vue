<template>
  <BrowserView :connection="checkConnection" />
  <LayoutView />
  <BannerProduct />
  <FooterView />
</template>
<script setup lang="ts">
    import BrowserView from './layout/BrowserView.vue'
    import LayoutView from './layout/LayoutView.vue'
    import BannerProduct from './layout/BannerProduct.vue'
    import FooterView from './layout/FooterView.vue'
    import { apiFinansas } from '@/api/api_finansas'
    import { useToast } from 'vue-toastification'
    import { ref } from 'vue'

    interface Connection {
      connection: string
    }

    const checkConnection = ref(false)
    const toast = useToast()

    const stableConnect = async () => {

        try {
            const response = await apiFinansas.get('/api')
            const data: Connection = response.data
            if(data.connection === 'ok') checkConnection.value = true
        } catch (error) {
            toast.error('Error de conexión')
            console.log(error)
        }
    }

    stableConnect()

</script>
