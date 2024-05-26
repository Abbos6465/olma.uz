<script setup lang="ts">
import {ref, watchEffect, watch} from "vue";
import {useProductStore} from "@/stores/product.store";
import {useRoute, useRouter} from "vue-router";
import {passingQueryNumber} from "@/utils/helper";
import AppPagination from "@/components/ui/AppPagination.vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const deleteProduct = async (id:number) => {
  await productStore.deleteProduct(id);
  fetchProducts();
}

const page = ref<number>(1);

const fetchProducts = () => {
  const params = {};
  console.log("fetchProducts", route.query.page);
  page.value = passingQueryNumber(route.query?.page);
  const category_id = passingQueryNumber(route.query?.category_id);
  const brand_id = passingQueryNumber(route.query?.brand_id);
  if(page.value) params['page'] = page.value;
  if(category_id) params['category_id'] = category_id;
  if(brand_id) params['brand_id'] = brand_id;

  productStore.fetchProducts(params);
}

watch(route, () => {
  fetchProducts();
}, {immediate: true});

watch(page, (newValue) => {
  if(newValue){
    console.log("page", newValue);
    router.push({query: {page: newValue}});
  }
});


</script>

<template>
  <section class="pb-4">
    <div class="container">
      <VRow class="h-100 align-items-center">
        <template v-if="productStore.productsLoading">
          <VCol
              cols="3"
              v-for="i in 12"
          >
            <VSkeletonLoader
                class="card-loader"
                elevation="4"
                type="image, article, actions"
            ></VSkeletonLoader>
          </VCol>
        </template>
        <template v-else>
          <VCol
              cols="3"
              v-for="product in productStore.products.data"
              :key="product.id"
              class="h-100"
          >
            <VCard
                tag="a"
                :to="{name: 'product.show', params: {id: product.id}}"
                hover
                class="pb-3 h-100"
            >
              <VImg
                  height="250"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  cover
              />
              <VCardItem>
                <VCardTitle>
                  {{ product.title }}
                </VCardTitle>
                <VCardSubtitle>
                  {{ `${product.brand.name}(${product.category.name})` }}
                </VCardSubtitle>
                <div class="mt-4 font-weight-bold text-2xl text-blue">
                  {{ product.price }} $
                </div>
                <div class="min-h-20">
                  {{ product.content }}
                </div>
                <div
                    v-if="product.can_change"
                    class="d-flex flex-wrap justify-end align-center ga-3 mt-8"
                >
                  <VBtn
                      size="small"
                      tag="a"
                      :to="{name: 'product.update', params: {id: product.id}}"
                      color="warning"
                      prepend-icon="$edit"
                  >
                    O'zgartirish
                  </VBtn>
                  <VBtn
                      :loading="productStore.pendingDeletionProductId === product.id"
                      size="small"
                      color="red"
                      prepend-icon="mdi-delete"
                      @click.prevent="deleteProduct(product.id)"
                  >
                    O'chirish
                  </VBtn>
                </div>
              </VCardItem>
            </VCard>
          </VCol>
        </template>
      </VRow>
      <AppPagination
          v-model="page"
          :last-page="productStore.products?.meta?.last_page"
      />
    </div>
  </section>
</template>

<style lang="scss">
  .card-loader{
    .v-skeleton-loader__image{
      height: 100%;
      min-height: 250px;
    }
  }
</style>
