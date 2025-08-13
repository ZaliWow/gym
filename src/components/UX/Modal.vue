<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';

interface Props {
  openModal: boolean
  message: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function confirmarAccion() {
  alert('Acción confirmada ✅')
  emit('close')
}
</script>
<template>
 <!-- Overlay oscuro -->
 <div 
    v-if="openModal" 
 class="fixed top-2 right-2 z-50 "
    @click.self="$emit('close')"
  >
    <!-- Contenido del modal -->
    <div class="bg-green-400  shadow-lg w-full max-w-md px-4 py-1 rounded-sm  relative ">
      <!-- Botón cerrar -->
      <button 
        @click="$emit('close')" 
        class="absolute top-0 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
      >
      <XMarkIcon class="w-6 h-6" />
      </button>

      <!-- Título -->
      <h2 class="text-2xl font-semibold mb-4"></h2>
      
      <!-- Contenido -->
      <p class="text-gray-900 mb-6">
    {{ message }}
      </p>

    
    </div>
  </div>
</template>