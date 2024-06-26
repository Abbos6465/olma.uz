<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useProductStore} from "@/stores/product.store";


// Stores //
const productStore = useProductStore();
// Stores end //

const drawerOpen = ref<boolean>(false);

onMounted(() => {
  productStore.fetchCategoriesWithBrands();
});

</script>

<template>
  <div class="navigation">
    <VAppBarNavIcon
        variant="text"
        @click.stop="drawerOpen = !drawerOpen"
    />
    <VNavigationDrawer
        v-model="drawerOpen"
        temporary
        width="300"
        class="navigation-drawer"
        expand-on-hover
    >
      <VList
          nav
          variant="text"
          class="navigation__list"
      >
        <VListItem
          prepend-icon="mdi-home"
          title="Barcha mahsulotlar"
          :to="{name: 'products'}"
          color="primary"
        />
        <VListGroup
            v-for="category in productStore.categoriesWidthBrands"
            :key="`category-${category.id}`"
            :value="`category-${category.id}`"
        >
          <template #activator="{props}">
            <VListItem
                v-bind="props"
                :title="category.name"
            />
          </template>
          <VListItem
              :to="{
                 name: 'products',
                 query: { category_id: category.id },
              }"
              class="navigation__list-item"
              title="Barchasi"
              color="primary"
          >

          </VListItem>
          <VListItem
              v-for="brand in category.brands"
              :key="`brand-${brand.id}`"
              :value="`brand-${brand.id}`"
              :to="{
                 name: 'products',
                 query: { category_id: category.id, brand_id: brand.id },
              }"
              color="primary"
              class="navigation__list-item"
              :title="brand.name"
          />
        </VListGroup>
      </VList>
    </VNavigationDrawer>
  </div>
</template>

<style lang="scss">
.navigation {

  .v-navigation-drawer__scrim{
    position: fixed;
    height: 100vh;
  }

  &-drawer {
    min-height: 100vh;
  }

  &__list{

   & &-item{
     padding-inline-start: 10px !important;
    }
  }
}
</style>
