<script setup lang="ts">
import {computed} from "vue";
import Breadcrumbs, {type BreadcrumbsItemType} from "@/components/ui/Breadcrumbs.vue";
import {useProductStore} from "@/stores/product.store";
import AppSelect from "@/components/ui/forms/AppSelect.vue";

const productStore = useProductStore();

const breadcrumbsItems = computed<BreadcrumbsItemType[]>(() => {
  return [
    {
      title: "Mahsulot qo'shish",
      disabled: true
    }
  ]
});

</script>

<template>
  <section>
    <Breadcrumbs
        :items="breadcrumbsItems"
        class="pb-10"
    />
    <div class="container product-create">
      <AppSelect
        
      />
    </div>
  </section>
</template>

<style lang="scss">

</style>
