<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue"
import { ref } from 'vue'
import ClientDetailsForm from "../components/RegisterClientComponents/ClientDetailsForm.vue"
import ClientBasicForm from "../components/RegisterClientComponents/ClientBasicForm.vue"
import { useClientStore } from "../stores/Clients"
import { useClient } from "../composables/useClient"

const store = useClientStore()
const step = ref(1)
const client = useClient()

function handleFinish() {
  store.saveClient()
  const storedClients = localStorage.getItem('clients')
  const newClientSupport = storedClients ? JSON.parse(storedClients) : []
  const newClient = newClientSupport[newClientSupport.length - 1]

  client.createClient(newClient)
 console.log(newClient)
}
</script>

<template>
   <HeaderComponent />
   <div class="flex flex-col items-center justify-center h-screen w-screen">
    <h1>Registro de Cliente</h1>

    <ClientBasicForm 
      v-if="step === 1" 
      @nextStep="step = 2"
    />

    <ClientDetailsForm
      v-if="step === 2"
      @finish="handleFinish"
    />
  </div>
</template>

<style scoped>

</style>
