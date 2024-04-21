import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";
import type {LoginDataType, RegisterDataType} from "@/types";
import {setAccessToken, removeAccessToken, getAccessToken} from "@/utils/local.storage";
import authApi from "@/api/auth.api";
import {tr} from "vuetify/locale";

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

    const auth = async (type: 'login' | 'register', data: LoginDataType | RegisterDataType) => {
        isAuth.value = false;
        isLoading.value = true;
        try{
            const response: User & access_token = await (type === 'login' ? authApi.login(data) : authApi.register(data));
            isAuth.value = true;
            setAccessToken(response.access_token);
            user.value = response.user;
        }finally{
            isLoading.value = false;
        }
    }

    const me = (): void => {
        if(!getAccessToken()) return
        isAuth.value = true;
        isLoading.value = true;
        authApi.me().then((response: User) => {
            user.value = response;
        }).finally(() => {
           isLoading.value = false;
        });
    }

    const logout = ():void => {
        isLoading.value = true;
        authApi.logout().then(() => {
            clearUser();
        }).finally(() => {
            isLoading.value = false;
        })
    }

    const clearUser = (): void => {
        isAuth.value = false;
        user.value = {};
        removeAccessToken();
    }

    return {
        isAuth,
        isLoading,
        user,
        clearUser,
        auth,
        logout,
        me
    }
})
