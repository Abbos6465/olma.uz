import axios from "@/utils/axios";
import type {RegisterDataType, LoginDataType, User} from "@/types/auth.type";

const prefix: "/auth" = "/auth";

interface AuthResponse {
    access_token: string,
    'expires_in': number,
    user: User
}

interface LogoutType {
    message: string
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

    async logout(): Promise<LogoutType>{
        const {data} = await axios.get(`${prefix}/logout`);
        return data;
    },

     async me(): Promise<User>{
        const {data} = await axios.get(`${prefix}/me`);
        return data;
    },

    async refresh(): Promise<AuthResponse>{
        const {data} = await axios.post(`${prefix}/refresh`);
        return data;
    }
}
