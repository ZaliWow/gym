// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw, } from "vue-router"
import Clients from "../pages/Clients.vue"
import RegisterClient from "../pages/RegisterClient.vue"
import ClientDetails from "../pages/ClientDetails.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/clients",
    name: "clients",
    component: Clients
  },
  {
    path: "/register/client",
    name: "registerClient",
    component: RegisterClient
  },
  {
    path: "/client/details/:id",
    name: "clientDetails",
    component: ClientDetails,
    props: true // Pasar "id" como prop al componente
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router