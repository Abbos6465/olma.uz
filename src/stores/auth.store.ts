import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";
import type {LoginDataType, RegisterDataType, User} from "@/types/auth.type";
import {setAccessToken, removeAccessToken, getAccessToken} from "@/utils/local.storage";
import authApi from "@/api/auth.api";
import {useRouter} from "vue-router";
import useToast from "@/components/ui/app-toast/useToast";

export const useAuthStore = defineStore('auth', () => {
    const isAuth:Ref<boolean> = ref(false);
    const isLoading:Ref<boolean> = ref(false);
    const user:Ref<User> = ref({});
    const router = useRouter();
    const {toast} = useToast();

    const auth = async (type: 'login' | 'register', data: LoginDataType | RegisterDataType) => {
        isAuth.value = false;
        isLoading.value = true;
        try{
            const response = await (type === 'login' ? authApi.login(data) : authApi.register(data));
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
        authApi.me().then(response => {
            user.value = response;
        }).finally(() => {
           isLoading.value = false;
        });
    }

    const logout = ():void => {
        isLoading.value = true;
        authApi.logout().then(response => {
            clearUser();
            toast.success({text: response.message})
        }).finally(() => {
            isLoading.value = false;
        })
    }

    const clearUser = (): void => {
        isAuth.value = false;
        user.value = {};
        removeAccessToken();
        router.replace({path: "/login"});
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
