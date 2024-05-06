import type {RouteLocationNormalized, NavigationGuardNext} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";

export default (to:RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    if(to.meta?.middleware?.auth && (!authStore.isAuth && !authStore.isLoading)){
        next({name: "login"});
    }else next();
}
