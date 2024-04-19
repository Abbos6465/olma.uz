import axios from "@/utils/axios";
import type {RegisterDataType, LoginDataType} from "@/types";

const prefix: "/auth" = "/auth";

export default {
    register(data: RegisterDataType){
        return axios.post(`${prefix}/register`, data);
    },

    login(data: LoginDataType){
        return axios.post(`${prefix}/login`, data);
    },

    logout(){
        return axios.get(`${prefix}/logout`);
    },

    me(){
        return axios.get(`${prefix}/me`);
    }
}