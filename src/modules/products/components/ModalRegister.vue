<template>
  <div>
    <!-- Botón para abrir el modal -->
    <button
      @click="openModal"

    >
    {{ message }}
    </button>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-opacity-50"
    >
      <div class="bg-orange-200 rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-lg font-semibold text-red-500">
          ¿Desea eliminar este elemento?
        </h2>
        <p class="text-sm text-red-500 mt-2">
          Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-end space-x-3 mt-4">
          <!-- Botón Cancelar -->
          <button
            @click="closeModal"
            class="w-24 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-orange-300 hover:shadow-lg"
          >
            Cancelar
          </button>
          <!-- Botón Aceptar -->
          <button
            @click="onSecondaryAction"
            class="w-24 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-red-600 hover:shadow-lg"
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
