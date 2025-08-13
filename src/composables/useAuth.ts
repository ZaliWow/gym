import { ref } from "vue"
import { supabase } from "../supaBaseClient"
import type { User } from "@supabase/supabase-js"
import type { UserData } from "../types/UserData"
import { useAuthStore } from "../stores/Auth"

export function useAuth() {
  const user = ref<User | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const authStore = useAuthStore()
  async function signUp(email: string, password: string ) {
    loading.value = true
    error.value = null
  
    try {
      const { data, error: err } = await supabase.auth.signUp({ email, password,  options: {
        emailRedirectTo: 'http://localhost:5173/complete-account'
      } })
  
      if (err) {
        error.value = err.message
        user.value = null
      } else {
        user.value = data.user
        authStore.setClient(user?.value?.id)
      }
  
    } catch (e) {
      // Captura errores inesperados (red, tipado, etc.)
      error.value = e instanceof Error ? e.message : String(e)
      user.value = null
    } finally {
      loading.value = false
    }
   
  
    return { user: user.value, error: error.value }
  }
  async function signIn(email: string, password: string) {
    loading.value = true
    error.value = null
  
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
  
      if (err) {
        error.value = err.message
        user.value = null
      } else {
        user.value = data.user
        authStore.setClient(user?.value?.id)
      }
  
    } catch (e) {
      // Errores inesperados (fallo de red, tipado, etc.)
      error.value = e instanceof Error ? e.message : String(e)
      user.value = null
    } finally {
      loading.value = false
    }
  
    return { user: user.value, error: error.value }
  }
  async function updateUser(userData: UserData) {
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .update({
          username: userData.username,
          updated_at: userData.updated_at,
          full_name: userData.full_name,
          avatar_url: userData.avatar_url,
          website: userData.website
        })
        .eq('id', userData.id)
        .select()
  
      if (err) {
        console.error("Error updating user:", err.message)
        return { data: null, error: err.message }
      }
  
      return { data, error: null }
  
    } catch (e) {
      console.error("Unexpected error:", e)
      return { data: null, error: e instanceof Error ? e.message : String(e) }
    }
  }

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error cerrando sesión:', error.message)
  } else {
    console.log('Sesión cerrada correctamente')
  }
}

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    updateUser,
    signOut          
  }
}