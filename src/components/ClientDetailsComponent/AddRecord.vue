<script lang="ts" setup>
import { ref } from 'vue';
import { useClientStore } from '../../stores/Clients';

const props = defineProps<{ clientId:string, showAddRecord:boolean }>()
const emit = defineEmits<{ (e: 'update:showAddRecord', value: boolean): void }>()
const Clientstore = useClientStore()

const weightKg = ref<number>()
const heightCm = ref<number>()
const note = ref<string>('')
function addRecord() {
    Clientstore.addProgressRecord(
        props.clientId, {
            weightKg: weightKg.value,
            heightCm: heightCm.value,
            note: note.value,
            date: new Date().toISOString().split("T")[0]

        })
        emit('update:showAddRecord', !props.showAddRecord)
}
</script>
<template>
    <form @submit.prevent="addRecord" class="bg-white p-6 rounded-lg shadow-md lg:w-1/2 w-3/4 mx-auto space-y-4">
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

     <!-- nota -->
     <div class="lg:px-10">
      <label class="block text-gray-700 font-medium mb-1" >Nota:</label>
      <input type="text" required  v-model="note"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
     </div>
     <button
     class="w-full mt-3 bg-blue-600 text-white py-2 px-4  rounded-md hover:bg-blue-700 transition-colors"
     type="submit">agregar</button>
    </form>

</template>