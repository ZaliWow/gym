<script lang="ts" setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const password = ref<string>("")
const email = ref<string>("")
const auth = useAuth()
async function Login(e: Event) {
  e.preventDefault()
auth.signIn(email.value, password.value)

}
</script>
<template>
   <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
    <!-- Logo / título -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Iniciar sesión</h1>
      <p class="text-sm text-gray-500">Ingresa tus credenciales para continuar</p>
    </div>

    <form action="/login" method="POST" class="space-y-4">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
          autocomplete="email"
          class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          placeholder="tucorreo@empresa.com"
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          name="password"
          required
          autocomplete="current-password"
          class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          placeholder="••••••••"
        />
      </div>

      <!-- Remember + Forgot -->
      <div class="flex items-center justify-between">
        <label class="inline-flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="remember" class="rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
          Recuérdame
        </label>
        <a href="/forgot-password" class="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
      </div>

      <!-- Submit -->
      <button
      @click="Login"
        type="submit"
        class="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Entrar
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-gray-200"></span>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-2 text-xs text-gray-500">o continúa con</span>
      </div>
    </div>

    <!-- Social (opcional) -->
    <div class="grid grid-cols-2 gap-3">
      <button class="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50">Google</button>
      <button class="w-full border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50">GitHub</button>
    </div>
  </div>
</section>
</template>