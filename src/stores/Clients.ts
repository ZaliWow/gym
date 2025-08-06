import { defineStore } from "pinia";
import type { Client } from "../types/Client";
import { ref, watch } from "vue";
import type { ClientDetails } from "../types/ClientDetails";
import type { ProgressRecord } from "../types/ProgressRecord";

export const useClientStore = defineStore("clients", () => {
    const newClient = ref<Client | null>(null)
    const clients = ref<Client[]>(JSON.parse(localStorage.getItem("clients") || "[]"));
    function setClientBase(data: Omit<Client, 'details'>) {
        newClient.value = { ...data, details: null }
    }
    function setClientDetails(details: ClientDetails) {
        if (newClient.value) {
            newClient.value.details = details
        }
    }
    function saveClient() {
        if (newClient.value && newClient.value.details) {
            clients.value.push(newClient.value)
            newClient.value = null
        } else {
            console.warn("❌ No se puede guardar: faltan detalles")
        }
    }
    function getClientById(id: string): Client | undefined {
        return clients.value.find(client => client.id === id);
    }
    function addProgressRecord(clientId: string, record: ProgressRecord) {
        const client = clients.value.find(c => c.id === clientId)
        if (client) {
          (client.progressRecord ??= []).push(record)
        }
      }
    watch(clients, (val) => {
        localStorage.setItem("clients", JSON.stringify(val))
    }, { deep: true })
    return {
        clients,
        newClient,
        setClientBase,
        setClientDetails,
        saveClient,
        getClientById,
        addProgressRecord
    }
})