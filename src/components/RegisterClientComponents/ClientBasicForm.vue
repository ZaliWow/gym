<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useClientStore } from '../../stores/Clients'
import { onBeforeRouteLeave } from 'vue-router'

const emit = defineEmits(['nextStep'])
const store = useClientStore()
const isDirty = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phoneNumber = ref('')
watch([firstName,lastName,email,phoneNumber], ()=>{
  isDirty.value = true
})
function handleBeforeUnload(event: BeforeUnloadEvent) {
  if (isDirty.value) {
    event.preventDefault()
    event.returnValue = ''
  }
}
window.addEventListener('beforeunload', handleBeforeUnload)

// Confirmación al navegar dentro de la app (Vue Router)
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const confirmLeave = window.confirm(
      'Tienes cambios sin guardar. Si sales perderás tu progreso. ¿Deseas continuar?'
    )
    if (!confirmLeave) return next(false)
  }
  next()
})

// Limpiar evento al desmontar
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
function next() {
  const id_coach = localStorage.getItem('userId')
  if (id_coach) {
    store.setClientBase({
    firstName: firstName.value,
    lastName: lastName.value,
    id_coach: id_coach,
    email: email.value,
    phoneNumber: phoneNumber.value
  })
  }
 

  emit('nextStep')
}
</script>

<template>
<form @submit.prevent="next" class="bg-white lg:p-6 p-4 rounded-lg shadow-md lg:w-1/2 w-3/4 mx-auto space-y-4">
  <div class="lg:px-10">
    <label class="block text-gray-700 font-medium mb-1">Nombre:</label>
    <input 
      v-model="firstName" 
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="lg:px-10">
    <label class="block text-gray-700 font-medium mb-1">Apellido:</label>
    <input 
      v-model="lastName" 
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="lg:px-10">
    <label class="block text-gray-700 font-medium mb-1">Email:</label>
    <input 
      type="email" 
      v-model="email" 
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="lg:px-10">
    <label class="block text-gray-700 font-medium mb-1">Teléfono:</label>
    <input 
      v-model="phoneNumber"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div class="flex justify-end">
  <button 
    type="submit"
    class="w-32 bg-blue-600 text-white py-2 px-4  rounded-md hover:bg-blue-700 transition-colors"
  >
    Siguiente
  </button>
</div>
</form>
</template>

<style>
</style>