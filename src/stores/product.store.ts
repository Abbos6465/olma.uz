import {defineStore} from "pinia";
import {ref} from "vue";
import type {CategoryWidthBrandType, ProductsParams, ProductsType} from "@/types/product.type";
import productApi from "@/api/product.api";
import useToast from "@/components/ui/app-toast/useToast";


export const useProductStore = defineStore("product", () => {
    const productsLoading = ref(false);
    const products = ref<ProductsType>({});
    const {toast} = useToast();

    const fetchProducts = (params:ProductsParams = {}) => {
        productsLoading.value = true;
        productApi.fetchProducts(params).then(response => {
            products.value.data = response.data;
            products.value.meta = {
                current_page: response.meta.current_page,
                last_page: response.meta.last_page
            }
        }).finally(() => {
            productsLoading.value = false;
        });
    }

    const pendingDeletionProductId = ref<number | null>(null);
    const deleteProduct = (id:number) => {
        pendingDeletionProductId.value = id;
        productApi.deleteProduct(id).then(response => {
            toast.success({text: response});
        }).finally(() => {
            pendingDeletionProductId.value = null;
        });
    }

    const categoriesWidthBrands = ref<CategoryWidthBrandType[]>([]);
    const categoriesWidthBrandsLoading = ref(false);

    const fetchCategoriesWithBrands = () => {
        categoriesWidthBrandsLoading.value = true;
        productApi.fetchCategoriesWithBrands().then(response => {
            categoriesWidthBrands.value = response;
        }).finally(() => {
            categoriesWidthBrandsLoading.value = false;
        });
    }

    return {
        productsLoading,
        products,
        fetchProducts,
        pendingDeletionProductId,
        deleteProduct,
        categoriesWidthBrands,
        categoriesWidthBrandsLoading,
        fetchCategoriesWithBrands
    }
});
