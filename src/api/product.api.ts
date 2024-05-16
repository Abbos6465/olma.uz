import axios from "@/utils/axios";
import type {ProductDataType, ProductsParams, ProductsType} from "@/types/product.type";
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore();
const prefix = '/products';

export default {
    fetchProducts(params:ProductsParams = {}):Promise<ProductsType>{
        return axios.get(prefix, {params});
    },

    fetchProduct(id:number){
        return axios.get(`${prefix}/${id}`);
    },

    createProduct(data: ProductDataType){
        return axios.post(prefix, data);
    },

    updateProduct(id: number, data: ProductDataType){
        return axios.put(`${prefix}/${id}`, data);
    },

    deleteProduct(id:number): Promise<string>{
        return axios.delete(`${prefix}/${id}`);
    },

    fetchProductsByCategory(id:number){
        return axios.get(`${prefix}/category/${id}`);
    },

    fetchProductsByBrand(id: number){
        return axios.get(`${prefix}/brand/${id}`)
    }
}
