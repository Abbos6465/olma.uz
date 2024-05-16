import {defineStore} from "pinia";
import {ref} from "vue";
import type {ProductsParams, ProductsType} from "@/types/product.type";
import productApi from "@/api/product.api";

export const useProductStore = defineStore("product", () => {
    const productsLoading = ref(false);
    const products = ref<ProductsType>({});

    const fetchProducts = async (params:ProductsParams = {}) => {
        productsLoading.value = true;
        await productApi.fetchProducts(params).then(response => {
            products.value.data = response.data;
            products.value.meta = {
                current_page: response.meta.current_page,
                last_page: response.meta.last_page
            }
        }).finally(() => {
            productsLoading.value = false;
        });
    }

    return {
        productsLoading,
        products,
        fetchProducts
    }
});
