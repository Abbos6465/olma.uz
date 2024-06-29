import {createRouter, createWebHistory} from 'vue-router'
import routes from "@/router/routes";
import type {Router, RouteLocationNormalized, NavigationGuardNext} from "vue-router";
import middleware from "@/router/middleware";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.onError((error: Error) => {

})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  middleware(to, from, next);
});

export default router
