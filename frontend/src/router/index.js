import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Singup from "../components/Singup.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Singup",
    component: Singup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
