import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OneFilm from "../views/OneFilm.vue";
import Request from "../views/Request.vue";
import Kategori from "../views/Kategori.vue";
import Person from "../views/Person.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:type/:id",
      name: "oneFilm",
      component: OneFilm,
    },
    {
      path: "/search/:request/:page",
      name: "request",
      component: Request,
    },
    {
      path: "/kategori/:tupe/:kNum/:page",
      name: "kategori",
      component: Kategori,
    },
    {
      path: "/person/:id",
      name: "person",
      component: Person,
    },
  ],
});

export default router;
