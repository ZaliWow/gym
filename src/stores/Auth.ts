import { defineStore } from "pinia";
import { ref, watch } from "vue";


export const useAuthStore = defineStore("auth", () => {
    
    const stored = localStorage.getItem('userData')
    const client = ref<string >(stored ? stored : "")
  
    // acción para setear client ID
    function setClient(c: string ) {
      client.value = c
    }
  
    // persistencia manual en localStorage
    watch(client, (val) => {
      localStorage.setItem('userData', val)
    }, { deep: true })
  
    return { client, setClient }
})