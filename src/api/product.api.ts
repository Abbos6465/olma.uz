import axios from "@/utils/axios";
import type {CategoryWidthBrandType, ProductDataType, ProductsParams, ProductsType} from "@/types/product.type";
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

    fetchCategoriesWithBrands():Promise<CategoryWidthBrandType[]>{
        return axios.get(`/categories-width-brands`);
    }
}
