import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {
    CategoryType,
    CategoryWidthBrandType,
    ProductsParams,
    ProductsType,
    ProductType
} from "@/types/product.type";
import productApi from "@/api/product.api";
import useToast from "@/components/ui/app-toast/useToast";
import useError from "@/components/ui/app-error/useError";



export const useProductStore = defineStore("product", () => {
    const {setNotFoundError, setServerError} = useError();
    const {toast} = useToast();

    const productsLoading = ref<boolean>(false);
    const products = ref<ProductsType>({
        data: [],
        meta: {
            current_page: 0,
            last_page: 0,
        }
    });
    const hasProductsData = computed<boolean>(() => {
        if (Object.keys(products.value).length > 0) return products.value?.data?.length > 0;
    });

    const fetchProducts = (params:ProductsParams = {}) => {
        productsLoading.value = true;
        productApi.fetchProducts(params).then(response => {
            products.value.data = response.data;
            products.value.meta = {
                current_page: response.meta.current_page,
                last_page: response.meta.last_page
            }
        }).catch(error => {
            if (error.status === 404) setNotFoundError();
            else setServerError(error);
        }).finally(() => {
            productsLoading.value = false;
        });
    }

    const pendingDeletionProductId = ref<number | null>(null);

    const deleteProduct = async (id:number)  => {
        pendingDeletionProductId.value = id;
        return await productApi.deleteProduct(id).then(response => {
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

    const product = ref<ProductType>({});
    const productLoading = ref<boolean>(false);
    const hasProduct = computed<boolean>(() => {
        return Object.keys(product.value).length > 0;
    })

    const fetchProduct = async (id: number):Promise<void> => {
        productLoading.value = true;
        await productApi.fetchProduct(id).then(response => {
            product.value = response;
        }).catch(error => {
            if (error.status === 404) setNotFoundError();
            else setServerError(error);
        }).finally(() => {
            productLoading.value = false;
        })
    }

    const categories = ref<CategoryType[]>([]);
    const categoriesLoading = ref(false);
    // const hasCate

    return {
        productsLoading,
        products,
        hasProductsData,
        fetchProducts,
        pendingDeletionProductId,
        deleteProduct,
        categoriesWidthBrands,
        categoriesWidthBrandsLoading,
        fetchCategoriesWithBrands,
        product,
        hasProduct,
        productLoading,
        fetchProduct
    }
});
