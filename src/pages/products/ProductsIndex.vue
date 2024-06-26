<script setup lang="ts">
import {ref, watch} from "vue";
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
  page.value = passingQueryNumber(route.query?.page);
  const category_id = passingQueryNumber(route.query?.category_id);
  const brand_id = passingQueryNumber(route.query?.brand_id);
  const name = route.query?.name;
  if(page.value) params['page'] = page.value;
  if(category_id) params['category_id'] = category_id;
  if(brand_id) params['brand_id'] = brand_id;
  if(name) params['name'] = name;

  productStore.fetchProducts(params);
}

watch(route, () => {
  fetchProducts();
}, {immediate: true});

watch(page, (newValue) => {
  if(newValue){
    router.push({query: {page: newValue}});
  }
});


</script>

<template>
  <section class="pb-4">
    <div class="container">
      <VRow>
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
          <template v-if="productStore.hasProductsData">
            <VCol
                cols="3"
                v-for="product in productStore.products.data"
                :key="product.id"
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
          <VCol
              cols="12"
              v-else
              class="d-flex flex-column justify-center align-center h-100"
          >
            <h1 class="v-card-title text-primary-500">Hozirda ushbu mahsulot mavjud emas</h1>
            <VBtn
                :to="{name: 'products'}"
                color="primary"
                rounded="xl"
                class="mx-auto"
            >
              Bosh sahifaga qaytish
            </VBtn>
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
