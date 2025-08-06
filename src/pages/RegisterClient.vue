<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue"
import { ref } from 'vue'
import ClientDetailsForm from "../components/RegisterClientComponents/ClientDetailsForm.vue"
import ClientBasicForm from "../components/RegisterClientComponents/ClientBasicForm.vue"
import { useClientStore } from "../stores/Clients"

const store = useClientStore()
const step = ref(1)

function handleFinish() {
  store.saveClient()
  step.value = 1 // volver al paso 1 para otro registro
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
