<script lang="ts" setup>
import { PhoneArrowDownLeftIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRegister() {
  router.push('/register')
}
function sendWhatsApp() {
  const phone = "573108310792" // Número en formato internacional sin "+"
  const message = "Hola, quisiera saber más sobre este producto para coach"
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${phone}?text=${encodedMessage}`

  window.open(url, "_blank")
}
</script>
<template>
   <section class="landing w-full h-screen flex flex-col items-center justify-center relative">
    <!-- Fondo -->
    <div class="absolute inset-0 bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Contenido -->
    <div class="relative z-10 bg:w-1/2 w-3/4 text-center px-4 bg-black/70 rounded-sm p-4">
      <h1 class="text-white text-4xl font-bold mb-4">
        Coach, toma el control
      </h1>
    
      <p class="text-gray-200 text-lg mb-8">
        Registra, organiza y presenta de forma clara el avance de tus clientes. Proporciona reportes personalizados con datos precisos, visuales atractivos y actualizaciones constantes que motiven y refuercen su compromiso con sus objetivos.      </p>
      <button
        @click="goToRegister"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
      >
        Registrarme Ahora
      </button>
    </div>
  </section>
<PhoneArrowDownLeftIcon @click="sendWhatsApp" class="fixed bottom-10 rounded-b-full rounded-t-full p-2 right-4 z-50 bg-green-400  w-10 h-10"/>

</template>
<style>
.landing {
    background-image: url("src/assets/landingbgdesk.png");
  background-size: cover;       /* La imagen cubre todo el contenedor */
  background-position: center;  /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que se repita */

}
@media (max-width: 500px) {
  .landing {
    background-image: url("src/assets/signupbg.png");
 
  }

}
</style>