import axios from "@/utils/axios";
import type {
    BrandType,
    CategoryType,
    CategoryWidthBrandType,
    ProductDataType,
    ProductsParams,
    ProductsType
} from "@/types/product.type";
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore();
const prefix:'/products' = '/products';

export default {
     fetchProducts(params:ProductsParams = {}):Promise<ProductsType>{
        return axios.get(prefix, {params});
    },

    async fetchProduct(id:number){
        const  {data} = await axios.get(`${prefix}/${id}`);
        return data;
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

    async fetchCategoriesWithBrands():Promise<CategoryWidthBrandType[]>{
        const {data} = await axios.get(`/categories-width-brands`);
        return data;
    },

    async fetchCategories(): Promise<CategoryType[]>{
        const {data} = await axios.get(`categories`);
        return data;
    },

    async fetchBrands(categoryId:number): Promise<BrandType[]>{
        const {data} = await axios.get(`brands/${categoryId}`);
        return data;
    }
}
