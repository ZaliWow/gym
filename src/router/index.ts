// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw, } from "vue-router"
import Clients from "../pages/Clients.vue"
import RegisterClient from "../pages/RegisterClient.vue"
import Register from "../pages/Register.vue"
import Login from "../pages/Login.vue"
import ClientDetails from "../pages/ClientDetails.vue"
import CompleteAccount from "../pages/CompleteAccount.vue"

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
  },
  {
    path: "/login",
    name:"login",
    component: Login
  },
  {
    path:"/register",
    name:"register",
    component: Register
  },
  {
    path:"/complete-account/",
    name:"complete-account",
    component: CompleteAccount
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router