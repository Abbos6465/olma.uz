import axios from "@/utils/axios";
import type {RegisterDataType, LoginDataType, User} from "@/types/auth.type";

const prefix: "/auth" = "/auth";

interface AuthResponse {
    access_token: string,
    user: User
}

export default {
    async register(registerData: RegisterDataType): Promise<AuthResponse>{
        const {data} = await axios.post(`${prefix}/register`, registerData);
        return data;
    },

    async login(loginData: LoginDataType): Promise<AuthResponse>{
        const {data} = await axios.post(`${prefix}/login`, loginData);
        return data;
    },

    logout(){
        return axios.get(`${prefix}/logout`);
    },

     async me(): Promise<User>{
        const {data} = await axios.get(`${prefix}/me`);
        return data;
    }
}
