<script setup lang="ts">
import {useAuthStore}   from "@/stores/auth.store";
import {useProductStore} from "@/stores/product.store";
import Navigation from "@/components/workplaces/Navigation.vue";
import AppInput from "@/components/ui/AppInput.vue";
import {ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";

// Stores //
const authStore = useAuthStore();
const productStore = useProductStore();
// Stores end //

// Vue Router //
const router = useRouter();
const route = useRoute();
// Vue Router End //

const name = ref<string>("");

const searchProduct = () => {
  const trimmedName = name.value.trim();
  const routeQueryTrimName = route.query.name ? String(route.query.name).trim() : '';

  if(trimmedName === routeQueryTrimName) return

  const query = {};
  if(name.value.length>0) query['name'] = name.value;

  router.push({name: 'products', query: query})
}

watch(route, (newValue) => {
  if(newValue.name === 'products' && newValue.query?.name && typeof newValue.query?.name === 'string') {
    name.value = newValue.query.name;
  }else {
    name.value = "";
  }
}, {immediate: true});

</script>

<template>
    <VAppBar
        color="primary"
       class="header px-5 d-flex align-center"
    >
        <Navigation/>
        <RouterLink
            :to="{ name: 'products' }"
            class="font-weight-bold text-decoration-none text-white"
        >
            Olma.uz
        </RouterLink>
        <VSpacer class="px-5 d-flex align-center justify-center">
          <AppInput
              v-model="name"
              class="w-50 d-flex align-center header__search-input"
              placeholder="Qidirish"
              density="comfortable"
              type="search"
              :append-click-function="searchProduct"
              color="white"
              rounded="xl"
              append-icon="mdi-magnify"
          />
        </VSpacer>
        <template v-if="$vuetify.display.mdAndUp">
          <VBtn
              v-if="route.name !== 'product.create'"
              rounded="xl"
              :to="{name: 'product.create'}"
              class="bg-green px-5 mr-5"
          >
            <VIcon
                icon="mdi-plus"
                start
            />
            Mahsulot qo'shish
          </VBtn>
           <VChip
               size="large"
               class="mr-5 px-5"
               variant="text"
           >
             <VIcon
                 icon="mdi-account-outline"
                 start
             />
            {{ authStore.user.username }}
          </VChip>
          <VBtn
              rounded="xl"
              :loading="authStore.isLoading"
              @click="authStore.logout"
              class="bg-red text-capitalize"
          >
            <VIcon
                icon="mdi-logout"
                start
            />
            Chiqish
          </VBtn>
        </template>
    </VAppBar>

</template>

<style lang="scss">
  .header{

    &__search-input{
      .v-field{
        height: 45px;
      }

      .v-input__details{
        display: none !important;
      }
    }
  }
</style>
