import { ref } from "vue";
import type { Client } from "../types/Client";
import { supabase } from "../supaBaseClient";

export function useClient() {
    const client = ref<Client | null>(null)
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)
  // Crea un cliente (ajusta los campos a los de tu tabla)
  async function createClient(payload: Omit<Client, 'id'>) {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('clients')
        .insert([payload])   // payload debe mapearse a columnas reales de la tabla
        .select()
        .single()            // si esperas 1 fila

      if (err) throw err
      client.value = data as Client
      return { data: client.value, error: null }
    } catch (e: any) {
      error.value = e.message ?? String(e)
      return { data: null, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return { client, loading, error, createClient }
}