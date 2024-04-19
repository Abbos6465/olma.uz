import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";
import type {LoginDataType, RegisterDataType} from "@/types";
import authApi from "@/api/auth.api";

interface User {
    id: number
    role: string,
    username: string,
    email: string
}

export const useAuthStore = defineStore('auth.store', () => {
    const isAuth:Ref<boolean> = ref(false);
    const isLoading:Ref<boolean> = ref(false);
    const user:Ref<User> = ref({});

    const register = (data: RegisterDataType): void => {
        isAuth.value = false;
        isLoading.value = true;
        authApi.register(data).then(response => {
            isAuth.value = true;
            console.log(response);
        }).finally(() => {
            isLoading.value = false;
        })
    }

    const login = (data: LoginDataType):void => {

    }

    const logout = ():void => {

    }

    const me = (): void => {

    }

    const clearUser = (): void => {

    }

    return {
        isAuth,
        isLoading,
        user,
        clearUser,
        register,
        login,
        logout,
        me
    }
})
