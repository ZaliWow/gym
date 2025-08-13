<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useClientStore } from '../../stores/Clients'
import { onBeforeRouteLeave } from 'vue-router'

const emit = defineEmits(['finish'])
const store = useClientStore()
const isDirty = ref(false)
const weightKg = ref<number>()
const heightCm = ref<number>()
const goals =ref<string>('')
const membershipType = ref<'basic' | 'premium' | 'vip'>('basic')
const startDate = ref('')
const birthDate =ref('')
const injuriesOrConditions = ref<string>('')
const gender = ref<'male' | 'female' | 'other'>('male')
const isActive = ref(true)
watch([weightKg, heightCm, membershipType, startDate, isActive], () => {
  isDirty.value = true
})
function handleBeforeUnload(event: BeforeUnloadEvent) {
  if (isDirty.value) {
    event.preventDefault()
    event.returnValue = ''
  }
}
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
window.addEventListener('beforeunload', handleBeforeUnload)

function finish() {
  store.setClientDetails({
    weightKg: weightKg.value,
    heightCm: heightCm.value,
    membershipType: membershipType.value,
    startDate: startDate.value,
    isActive: isActive.value,
    goals: goals.value,
    birthDate: birthDate.value,
    gender: gender.value,
    injuriesOrConditions: injuriesOrConditions.value,
  })

  emit('finish')
}
</script>
<template>
  <form @submit.prevent="finish" class="bg-white p-6 rounded-lg shadow-md lg:w-1/2 w-3/4 mx-auto space-y-4">
    <!-- Peso -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1">Peso (kg):</label>
      <input type="number" v-model.number="weightKg"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <!-- Altura -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1">Altura (cm):</label>
      <input type="number" v-model.number="heightCm"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <!-- Membresía -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1">Membresía:</label>
      <select v-model="membershipType" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="basic">Básica</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
      </select>
    </div>
    <!-- Fecha de nacimiento -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1">Fecha de nacimiento:</label>
      <input type="date" v-model="birthDate" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

    </div>
    <!-- Metas-->
     <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1" >Metas:</label>
      <input type="text" required  v-model="goals"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
     </div>
    <!-- Genero -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1">Genero:</label>
      <select v-model="gender" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Prefiero no decirlo</option>
      </select>
    </div>
    <!-- Lesiones -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1" >Lesiones o Condiciones:</label>
      <input type="text" required  v-model="injuriesOrConditions"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
     </div>
  
    <!-- Fecha de inicio -->
    <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1">Fecha de inicio:</label>
      <input type="date" v-model="startDate" required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <!-- Estado Activo -->
    <div class="flex items-center gap-2 lg:px-10">
      <input type="checkbox" v-model="isActive"
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
      <label class="text-gray-700 font-medium">Activo</label>
    </div>

    <!-- Botón Guardar -->
    <div class="flex justify-end">
      <button type="submit"
        class="w-32 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
        Guardar
      </button>
    </div>
  </form>
</template>
