import Vue from "vue";
import VueRouter from "vue-router";
var firebase = require("firebase/app");

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/agregar",
    name: "agregar",
    component: () => import("@/views/Agregar.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/editar/:id",
    name: "editar",
    component: () => import("@/views/Editar.vue"),
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth);
  const user = firebase.auth().currentUser;

  if (protectedRoute === true && user === null) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
