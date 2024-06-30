<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Breadcrumbs, {type BreadcrumbsItemType} from "@/components/ui/Breadcrumbs.vue";
import {useProductStore} from "@/stores/product.store";
import AppSelect from "@/components/ui/forms/AppSelect.vue";
import AppForm, {type ValidationType} from "@/components/ui/forms/AppForm.vue";
import type {ProductDataType} from "@/types/product.type";
import AppInput from "@/components/ui/forms/AppInput.vue";
import AppTextarea from "@/components/ui/forms/AppTextarea.vue";

const productStore = useProductStore();

const breadcrumbsItems = computed<BreadcrumbsItemType[]>(() => {
  return [
    {
      title: "Mahsulot qo'shish",
      disabled: true
    }
  ]
});

const validation = ref<ValidationType>({});

const form = ref<ProductDataType>({
  category_id: null,
  brand_id: null,
  title: "",
  price: null,
  content: "",
  photo: null
})

onMounted(() => {
  productStore.fetchCategories();
});

const fetchBrands = () => {
  if (!form.value.category_id) return
  productStore.fetchBrands(form.value.category_id);
}

const createProduct = async () => {
  if (!(await validation.value?.validate())) return
}

</script>

<template>
  <section>
    <Breadcrumbs
        :items="breadcrumbsItems"
        class="pb-10"
    />
    <div class="container product-create">
      <VCard class="pa-10 w-75 mx-auto">
        <AppForm
            v-model:validation="validation"
            class="product-create__form v-row v-row--dense"
        >
          <AppSelect
              v-model="form.category_id"
              :items="productStore.categories"
              item-value="id"
              item-title="name"
              label="Kategoriyani tanlang"
              class="product-create__form-item v-col-6"
              @change="fetchBrands"
              required
          />
          <AppSelect
              v-model="form.brand_id"
              :items="productStore.brands"
              item-value="id"
              item-title="name"
              label="Brandni tanlang"
              class="product-create__form-item v-col-6"
              :disabled="productStore.brandsLoading || !form.category_id"
              required
          />
          <AppInput
              v-model="form.title"
              class="product-create__form-item v-col-12"
              label="Sarlavhani kiriting"
              placeholder="Kiriting"
              required
          />
          <AppInput
              v-model="form.price"
              class="product-create__form-item v-col-12"
              label="Narxni kiriting (USD)"
              placeholder="Kiriting"
              type="number"
              icon="mdi-currency-usd"
              required
          />
          <AppTextarea
              v-model="form.content"
              placeholder="Kiriting"
              label="Tavsif kiriting"
              required
              class="product-create__form-item v-col-12"
          />
          <VCol
              cols="12"
              class="d-flex justify-end"
          >
            <VBtn
                color="primary"
                @click="createProduct"
                class="px-15"
            >
              Qo'shish
            </VBtn>
          </VCol>
        </AppForm>
      </VCard>
    </div>
  </section>
</template>

<style lang="scss">

</style>
