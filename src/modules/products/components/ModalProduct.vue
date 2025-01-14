<template>
  <div>
    <!-- Botón para abrir el modal -->
    <button
      @click="openModal"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
    {{ message }}
    </button>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-lg font-semibold text-gray-800">
          ¿Desea eliminar este elemento?
        </h2>
        <p class="text-sm text-gray-600 mt-2">
          Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-end space-x-3 mt-4">
          <!-- Botón Cancelar -->
          <button
            @click="closeModal"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <!-- Botón Aceptar -->
          <button
            @click="onSecondaryAction"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
 import { ref, type PropType } from "vue";





defineProps({
  onSecondaryAction: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    required: false,
    default: () => {}
  },
  message: {
    type: String,
    required: true
  }
});





// Estado para controlar la apertura del modal
const isModalOpen = ref(false);

// Método para abrir el modal
const openModal = () => {
  isModalOpen.value = true;
};

// Método para cerrar el modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Método para confirmar la acción
// const confirmAction = () => {
//   alert("Acción confirmada");
//   closeModal();
// };

</script>
