import axios from "axios";
import type {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import {useAuthStore} from "@/stores/auth.store";
import {getAccessToken} from "@/utils/local.storage";
import useToast from "@/components/ui/app-toast/useToast";
import {generateRandomID} from "@/utils/helper";
const id = generateRandomID();

const {toast, items,} = useToast();

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000
});

axiosInstance.interceptors.request.use(
     async (config:InternalAxiosRequestConfig<any>) => {
         const authStore = useAuthStore();
         if (authStore.isTokenExpired()) await authStore.refresh();

        const accessToken: string | null = getAccessToken();
        if (accessToken != null) config.headers['Authorization'] = 'Bearer ' + accessToken;

        return config;
    },

    (error) => {
        if (error.response?.status === 401) {
            toast.error({text: error.response.statusText});
            useAuthStore().clearUser();
        }

        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    ({data}) => {
        return data;
    },

    ({response}) => {
        if (response) {
            const status = response.status;
            if(status !== 404){
                toast.error({text: response.statusText, id: `${id}_error-${status}`});
            }

            if (status === 401) {
                useAuthStore().clearUser();
            }
        }

        return Promise.reject(response)
    }
)
export default axiosInstance
