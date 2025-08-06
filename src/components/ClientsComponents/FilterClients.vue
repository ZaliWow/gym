<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useClientStore } from '../../stores/Clients'
import { useRouter } from 'vue-router'
import type { Client } from '../../types/Client'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  filters: { name: string; email: string }
}>()

const emit = defineEmits(['update:filters'])

function updateName(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:filters', { ...props.filters, name: value })
}

function updateEmail(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:filters', { ...props.filters, email: value })
}
</script>
<template>
<div class="flex flex-wrap gap-4 mb-6">
    <input
      type="text"
      class="border rounded px-3 py-2 w-64"
      placeholder="Buscar por nombre"
      :value="filters.name"
      @input="updateName"
    />
    <input
      type="text"
      class="border rounded px-3 py-2 w-64"
      placeholder="Buscar por email"
      :value="filters.email"
      @input="updateEmail"
    />
  </div>
 
</template>