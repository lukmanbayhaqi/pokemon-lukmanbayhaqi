import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/detail/:id",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/Favorite.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
