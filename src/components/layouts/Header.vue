<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useProductStore} from "@/stores/product.store";
import {useRouter} from "vue-router";

const router = useRouter();
const drawerOpen = ref<boolean>(false);
const productStore = useProductStore();

onMounted(() => {
  productStore.fetchCategoriesWithBrands();
});

const test = ref('');

</script>

<template>
  <VAppBar
      color="primary"
      prominent
  >
    <VAppBarNavIcon
        size="large"
        variant="text"
        @click="drawerOpen = !drawerOpen"
    />

    <RouterLink
        :to="{name: 'products'}"
        class="font-weight-bold text-decoration-none text-white"
    >
        Olma.uz
    </RouterLink>
    <VSpacer></VSpacer>

    <template v-if="$vuetify.display.mdAndUp">
      <VBtn
          icon="mdi-magnify"
          variant="text"
      ></VBtn>
    </template>
  </VAppBar>
  <VNavigationDrawer
      v-model="drawerOpen"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
      width="300"
      expand-on-hover
  >
    <VList
        v-model="test"
        nav
        variant="text"
    >
      <VListGroup
        v-for="category in productStore.categoriesWidthBrands"
        :key="`category-${category.id}`"
      >
        <template #activator>
            <VListItem :value="`category-${category.id}`">
              <VListItemTitle>
                {{ category.name }}
              </VListItemTitle>
            </VListItem>
        </template>
        <VListItem
          v-for="brand in category.brands"
          :key="`brand-${brand.id}`"
          :value="`brand-${brand.id}`"
          :to="{name: 'products', query: {category_id: category.id, brand_id: brand.id}}"
        >
            {{ brand.name }}
        </VListItem>
      </VListGroup>
    </VList>
  </VNavigationDrawer>
</template>
