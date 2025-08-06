<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useClientStore } from '../../stores/Clients'
import AddRecord from '../ClientDetailsComponent/AddRecord.vue'
const route = useRoute()
const store = useClientStore()

const clientId = route.params.id as string
const client = computed(() => store.getClientById(clientId))
const showAddRecord = ref<boolean>(false)

function addRecord(event: Event) {
    event.preventDefault()
    showAddRecord.value = true
}
</script>
<template>
    <section class="p-6">
        <h1 class="text-2xl font-bold mb-4">Detalles del Cliente</h1>

        <div v-if="client" class="bg-white shadow-md rounded-lg p-4 space-y-2">
            <p><strong>Nombre:</strong> {{ client.firstName }} {{ client.lastName }}</p>
            <p><strong>Email:</strong> {{ client.email }}</p>
            <p><strong>Teléfono:</strong> {{ client.phoneNumber || 'No registrado' }}</p>

            <div class="mt-4 border-t pt-3">
                <p><strong>Peso:</strong> {{ client.details?.weightKg }} kg</p>
                <p><strong>Altura:</strong> {{ client.details?.heightCm }} cm</p>
                <p><strong>Membresía:</strong> {{ client.details?.membershipType }}</p>
                <p><strong>Lesiones o condiciones:</strong> {{ client.details?.injuriesOrConditions }}</p>
                <p><strong>Metas:</strong> {{ client.details?.goals }}</p>
                <p><strong>Fecha de nacimiento:</strong> {{ client.details?.birthDate }}</p>
                <p><strong>Genero:</strong> {{ client.details?.gender }}</p>
                <p><strong>Entrenador asignado:</strong> {{ client.details?.trainerAssigned }}</p>
                <p><strong>Activo:</strong>
                    <span :class="client.details?.isActive ? 'text-green-600' : 'text-red-600'">
                        {{ client.details?.isActive ? 'Sí' : 'No' }}
                    </span>
                </p>
                <button 
                v-if="!showAddRecord"
                @click="addRecord"
                type="submit"
                    class="w-full mt-3 bg-blue-600 text-white py-2 px-4  rounded-md hover:bg-blue-700 transition-colors">
                    Agregar registro</button>
            </div>
        <div v-if="showAddRecord">
         <AddRecord :clientId="clientId" v-model:showAddRecord="showAddRecord"/>
        </div>
        </div>
      

        <div v-else class="text-red-500">
            Cliente no encontrado
        </div>
    </section>

</template>