<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {useProductStore} from "@/stores/product.store";
import productApi from "@/api/product.api";
import {useRoute} from "vue-router";
import {passingQueryNumber} from "@/utils/helper";
import useToast from "@/components/ui/app-toast/useToast";
import {tr} from "vuetify/locale";

const route = useRoute();
const productStore = useProductStore()
const {toast} = useToast()

const deleteProduct = async (id:number) => {
  await productStore.deleteProduct(id);
  fetchProducts();
}

const fetchProducts = () => {
  const params = {};
  const page = passingQueryNumber(route.query?.page);
  const category_id = passingQueryNumber(route.query?.category_id);
  const brand_id = passingQueryNumber(route.query?.brand_id);
  if(page) params['page'] = page;
  if(category_id) params['category_id'] = category_id;
  if(brand_id) params['brand_id'] = brand_id;

  productStore.fetchProducts(params);
}

watchEffect(() => {
  fetchProducts();
});

</script>

<template>
  <div class="container">
    <VRow>
      <template v-if="productStore.productsLoading">
        <VCol
            cols="3"
            v-for="i in 4"
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
        >
          <VCard
              tag="a"
              :to="{name: 'products.show', params: {id: product.id}}"
              hover
              class="pb-3"
              min-height="450"
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
  </div>
</template>

<style lang="scss">
  .card-loader{
    .v-skeleton-loader__image{
      height: 100%;
      min-height: 250px;
    }
  }
</style>
