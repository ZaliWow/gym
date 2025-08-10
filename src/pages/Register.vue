<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import type { UserData } from '../types/UserData';
import { useAuthStore } from '../stores/Auth';
import Modal from '../components/UX/Modal.vue';

const isModalOpen = ref<boolean>(true)
const messageModal = ref<string>("lorem uno dos tres cuatro esto es un mensaj de prueba si que si")
const email = ref<string>("")
const password = ref<string>("")
const step = ref<number>(1)
const authStore = useAuthStore()


async function changeStep(e: Event) {
  e.preventDefault()
  try {
    const { user, error } = await useAuth().signUp(email.value, password.value)
   
    if(user){
      authStore.setClient( user.id)
      isModalOpen.value = true
      messageModal.value = "el usuario ha sido registrado con exito."
    }
    if (error) {
      isModalOpen.value = true
      messageModal.value =  `Oops, algo ha salido mal ${error}`   
    }
  
  } catch (error) {
    isModalOpen.value = true
    messageModal.value =  `Oops, algo ha salido mal ${error}`   
  }
}
</script>
<template>
  
  <section v-if="step === 1  " class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <!-- Título -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Crear cuenta</h1>
        <p class="text-sm text-gray-500">Completa el formulario para registrarte</p>
      </div>

      <form class="space-y-4">


        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input type="email" id="email" name="email" v-model="email" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="tucorreo@empresa.com" />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" id="password" name="password" v-model="password" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="••••••••" />
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input type="password" id="confirm-password" name="confirm-password" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="••••••••" />
        </div>

        <!-- Términos -->
        <div class="flex items-center">
          <input type="checkbox" id="terms" name="terms" required
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
          <label for="terms" class="ml-2 text-sm text-gray-600">
            Acepto los <a href="/terms" class="text-blue-600 hover:underline">términos y condiciones</a>
          </label>
        </div>

        <!-- Botón -->
        <button @click="changeStep"
          class="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          Registrarme
        </button>
      </form>

      <!-- Link a login -->
      <p class="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?
        <a href="/login" class="text-blue-600 hover:underline">Inicia sesión aquí</a>
      </p>
    </div>
  </section>
  <section v-if="step === 2 " class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h1>Cuenta creada con exito, por favor confirma tu correo electrónico para completar el tu perfil</h1>
    </div>
  </section>
  <Modal
    :message="messageModal"
    :openModal="isModalOpen" 
    @close="isModalOpen = false" 
  />
 
</template>