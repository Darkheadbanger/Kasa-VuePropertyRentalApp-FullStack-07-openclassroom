import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import MyProfil from "../views/MyProfil.vue";
import Update from "../views/Update.vue";
// import Forgot from "../views/Forgot.vue";
const routes = [
  {
    path: "/",
    // redirect: '/login',
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      guest: true,
    },
  },
  {
    path: "/myProfil",
    name: "MyProfil",
    component: MyProfil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/update",
    name: "Update",
    component: Update,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: "/forgot",
  //   name: "Forgot",
  //   component: Forgot,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// If not connected back to login
router.beforeResolve((to, from, next) => {
  if (to.meta.guest) {
    next();
  } else if (to.meta.requiresAuth) {
    const getToken = localStorage.getItem("userToken");
    if (!getToken) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  }
});
// If connected back to home
router.beforeResolve((to, from, next) => {
  if (to.meta.requiresAuth) {
    next();
  } else if (to.meta.guest) {
    const getToken = localStorage.getItem("userToken");
    if (getToken) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  }
});

export default router;
