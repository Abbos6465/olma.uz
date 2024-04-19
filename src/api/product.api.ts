import axios from "@/utils/axios";
import type {ProductDataType} from "@/types";

const prefix = '/products';

export default {
    fetchProducts(){
        return axios.get(prefix);
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

    deleteProduct(id:number){
        return axios.delete(`${prefix}/${id}`);
    },

    fetchProductsByCategory(id:number){
        return axios.get(`${prefix}/category/${id}`);
    },

    fetchProductsByBrand(id: number){
        return axios.get(`${prefix}/brand/${id}`)
    }
}