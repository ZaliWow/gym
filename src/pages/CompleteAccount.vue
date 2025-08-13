<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import type { UserData } from '../types/UserData';
import { useRoute } from 'vue-router';
import { supabase } from '../supaBaseClient';
import router from '../router';
import Modal from '../components/UX/Modal.vue';
const route = useRoute()
const username = ref<string>("")
const full_name = ref<string>("")
const avatar_url = ref<string>("")
const website = ref<string>("")
const isModalOpen = ref<boolean>(false)
const messageModal = ref<string>("¡Tu perfil se ha completado con éxito!  Ahora podrás registrar clientes y llevar un control detallado de sus avances.")

onMounted(async () => {
    const paramUserId = route.params.userId
    const userId = localStorage.getItem('userData')
    if(!userId && !paramUserId)
 { const { data, error } = await supabase.auth.getUser()
  if (error) {
    router.push("register")
    return
  }
  const user = data.user
  if (user) {
    router.replace({ path: '/complete-account', query: { userId: user.id } })
  }}
  else return
})
async function submit(e: Event) {
  e.preventDefault()
  try {
    const paramUserId = route.params.userId
    const userId = localStorage.getItem('userData')
    if (userId || paramUserId) {
      const userDataConstructor: UserData = {
        id: userId ? userId : paramUserId[0],
        updated_at: new Date().toISOString(),
        username: username.value,
        full_name: full_name.value,
        avatar_url: avatar_url.value,
        website: website.value,
      }
      try {
        if (userId) {
          const { data, error } = await useAuth().updateUser(userDataConstructor)
          if (data) {
            isModalOpen.value = true
            router.push("clients")
          }
          if (error) {
            alert(error)
          }
        }
      } catch (error) {
        alert(error)
      }
    }

  } catch (error) {
    alert(error)
  }
}
</script>
<template>
     <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <!-- Título -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Completa tu cuenta</h1>
        <p class="text-sm text-gray-500">Agrega tu informacion personal</p>

      </div>
      <form class="space-y-4">
        <div>
          <!-- Nombre de usuario -->
          <label for="username" class="block text-sm font-medium text-gray-700">User</label>
          <input type="username" id="username" name="username" v-model="username" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="David dev" />
        </div>
        <div>
          <!-- Nombre Completo -->
          <label for="full_name" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input type="full_name" id="full_name" name="full_name" v-model="full_name" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="David Morales" />
        </div>
        <div>
          <!-- Avatar -->
          <label for="avatar_url" class="block text-sm font-medium text-gray-700">Avatar</label>
          <input type="avatar_url" id="avatar_url" name="avatar_url" v-model="avatar_url" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="mi avatar" />
        </div>
        <div>
          <!-- WebSite -->
          <label for="website" class="block text-sm font-medium text-gray-700">WebSite</label>
          <input type="website" id="website" name="website" v-model="website" required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="www.mywebsite.com" />
        </div>
        <!-- Botón -->
        <button @click="submit"
          class="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
          Completar
        </button>
      </form>

    </div>

  </section>
  <Modal
    :message="messageModal"
    :openModal="isModalOpen" 
    @close="isModalOpen = false" 
  />
</template>