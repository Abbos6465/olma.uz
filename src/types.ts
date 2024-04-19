    export interface RegisterDataType {
        username: string,
        email: string,
        password: string | number
    }

    export interface LoginDataType {
        username: string,
        password: string | number
    }

    export interface ProductDataType {
        category_id: number,
        brand_id: number,
        title: string,
        price: number,
        content: string,
        photo: File
    }