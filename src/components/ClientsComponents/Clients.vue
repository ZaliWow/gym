<script lang="ts" setup>
import { EnvelopeIcon, PhoneArrowDownLeftIcon } from '@heroicons/vue/16/solid';
import { useRouter } from 'vue-router'
import type { Client } from '../../types/Client';
const router = useRouter()

function viewDetails(id: string) {
    router.push(`/client/details/${id}`)

}
const props = defineProps<{ clients: Client[] }>()

</script>
<template>
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Clientes Registrados</h1>

<div class="flex flex-col lg:flex-row gap-4">
    <div v-for="client in clients" :key="client.id"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between lg:w-96 w-80">
        <!-- Datos básicos -->
        <div>
            <h2 class="text-lg font-semibold text-gray-700">
                {{ client.firstName }} {{ client.lastName }}
            </h2>
            <p class="flex items-center gap-2 text-gray-500 text-sm">
                <PhoneArrowDownLeftIcon class="w-5 h-5 text-gray-600" />
                {{ client.phoneNumber || 'Sin teléfono' }}
            </p>

            <p class="flex items-center gap-2 text-gray-500 text-sm">
                <EnvelopeIcon class="w-5 h-5 text-gray-600" />
                {{ client.email }}
            </p>
        </div>

        <!-- Botón de acción -->
         <div class="w-full flex justify-end">
            <button @click="viewDetails(client.id)"
            class="mt-4 w-32 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            Ver Detalles
        </button>
         </div>
       
    </div>
</div>
</template>