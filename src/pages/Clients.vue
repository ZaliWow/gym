<script setup lang="ts">
import { useClientStore } from '../stores/Clients';
import HeaderComponent from "../components/HeaderComponent.vue"
import Clients from '../components/ClientsComponents/Clients.vue';
import FilterClients from '../components/ClientsComponents/FilterClients.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Client } from '../types/Client';
const route = useRoute()
const router = useRouter()
const clientsStore = useClientStore()
const filters = ref({
  name: (route.query.name as string) || '',
  email: (route.query.email as string) || ''
})

onMounted(async ()=>{
  
})
// Computed con filtros aplicados
const filteredClients = computed<Client[]>(() => {
  return clientsStore.clients.filter(client => {
    const matchName = filters.value.name
      ? `${client.firstName} ${client.lastName}`.toLowerCase().includes(filters.value.name.toLowerCase())
      : true
    const matchEmail = filters.value.email
      ? (client.email || '').toLowerCase().includes(filters.value.email.toLowerCase())
      : true
    return matchName && matchEmail
  })
})

// Sincronizar query params en la URL
watch(filters, (val) => {
    if (val.email !=="" || val.name!== "") {
        router.replace({ query: { ...val } })
    }

}, { deep: true })
</script>

<template>
    <HeaderComponent />
    <section v-if="clientsStore.clients.length > 0" class="p-6 bg-gray-100 min-h-screen">
        <FilterClients v-model:filters="filters"/>
        <Clients :clients="filteredClients"/>
    </section>
    <section v-else>
        <h1>No hay clientes registrados</h1>
    </section>
</template>

<style scoped></style>
