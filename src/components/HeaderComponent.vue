<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import { Bars3Icon, XMarkIcon, UserGroupIcon, UserPlusIcon, LanguageIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const isOpen = ref(false)
const auth = useAuth()
async function Logout(e:Event) {
  e.preventDefault()
   await auth.signOut()
}
  </script>

<template>
   <nav class="bg-blue-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <!-- Logo -->
        <div class="flex-shrink-0 text-lg font-bold">
          MyApp
        </div>

        <!-- Desktop Menu -->
         <div class="hidden md:flex">
          <ul class="hidden md:flex">
          <li class="flex items-center gap-2 hover:text-gray-200">
            <UserGroupIcon class="w-5 h-5" />
            <RouterLink to="/clients" class="nav-link">Clientes</RouterLink>
          </li>
          <li class="flex items-center gap-2 hover:text-gray-200">
            <UserPlusIcon class="w-5 h-5" />
            <RouterLink to="/register/client" class="nav-link">Registrar Cliente</RouterLink>
          </li>
        </ul>
         </div>
       

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="focus:outline-none">
            <Bars3Icon v-if="!isOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
   
  </nav>
  <div class="fixed z-40 w-full flex justify-end bg-gray-600/50  ">
    <div v-if="isOpen" class="md:hidden w-1/2 h-screen bg-blue-600">
      <ul class="flex flex-col py-3">
        <li class="flex items-center border-t border-white p-3 rounded">
          <UserGroupIcon class="w-5 h-5" />
          <RouterLink to="/clients" class="nav-link" @click="isOpen = false">Clientes</RouterLink>
        </li>
        <li class="flex w-full items-center border-t  border-white p-3 rounded">
          <UserPlusIcon class="w-5 h-5" />
          <RouterLink to="/register/client" class="nav-link" @click="isOpen = false">Registrar Cliente</RouterLink>
        </li>
        <li class="flex w-full items-center border-t  border-white p-3 rounded">
          <LanguageIcon class="w-5 h-5" />
          <RouterLink to="/login" class="nav-link" @click="Logout">Cerrar Sesion</RouterLink>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 10px;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }
  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
  .nav-link:hover {
    text-decoration: underline;
  }
  </style>