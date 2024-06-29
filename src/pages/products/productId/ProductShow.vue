<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, watch} from "vue";
import {numFormat, passingQueryNumber} from "@/utils/helper";
import {useProductStore} from "@/stores/product.store";
import Breadcrumbs, {type BreadcrumbsItemType} from "@/components/ui/Breadcrumbs.vue";
import AppProgressCircular from "@/components/ui/AppProgressCircular.vue";


// Stores //
const productStore = useProductStore();
// Stores end //

// Vue Router //
const route = useRoute();
const router = useRouter();
// Vue Router end //

watch(() => route.params.id, (id:string) => {
  const numberTypeId: number | null = passingQueryNumber(id);
  if (numberTypeId) {
    productStore.fetchProduct(numberTypeId);
  }
}, {immediate: true});


const breadcrumbsItems = computed<BreadcrumbsItemType[]>(() => {

  if(productStore.productLoading || (!productStore.productLoading && !productStore.hasProduct)) return [];

  return [
    {
      title: productStore.product?.category.name,
      href: {name: 'products', query: {category: productStore.product.category.id}}
    },
    {
      title: productStore.product.brand.name,
      href: {name: 'products', query: {category_id: productStore.product.category.id, brand_id: productStore.product.brand.id}}
    },
    {
      title: productStore.product?.title,
      disabled: true
    }
  ]
});

</script>

<template>
  <section class="product-show-sec">
    <AppProgressCircular
        v-if="productStore.productLoading"
        class="mt-15 product-show__app-progress-circular"
        :size="90"
    />
    <template v-else-if="productStore.hasProduct && !productStore.productLoading">
      <Breadcrumbs
          :items="breadcrumbsItems"
          class="pb-10"
      />
      <div class="container product-show">
        <VImg
            height="450"
            :src="productStore.product.photo?.length>0 ? productStore.product.photo :  'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
            cover
            rounded="sm"
        />
        <h1 class="product-show__title mt-5 font-weight-medium text-blue-grey-darken-4">
          {{ productStore.product.title }}
        </h1>
        <h2 class="text-lg-subtitle-1 text-blue-grey-darken-4">
          {{ productStore.product?.category?.name }}({{productStore.product?.brand?.name}})
        </h2>
        <h3 class="text-subtitle-2 font-italic text-blue-grey-darken-4">
          {{ numFormat(productStore.product.price) }}$
        </h3>
        <p class="text-blue-grey-darken-4 mt-10">
          {{ productStore.product.content }}
        </p>
      </div>
    </template>
  </section>
</template>

<style lang="scss">
  .product-show{

    &__title{
      @include font-size(24);
    }

    &__app-progress-circular{
      min-height: 55vh;
    }
  }
</style>
