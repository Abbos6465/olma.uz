export interface LoginDataType {
    username: string;
    password: string | number;
}

export interface RegisterDataType extends BaseAuthDataType {
    email: string;
}

export interface User {
    id: number
    role: string,
    username: string,
    email: string
}
