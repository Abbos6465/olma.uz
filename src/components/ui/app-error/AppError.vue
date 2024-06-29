<script setup lang="ts">
import useError from "./useError";
import {computed, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const {error, hasError, clear} = useError();

const computedImage = computed<string>(() => {
  return error.value?.image ?? 'https://vuetifyjs.b-cdn.net/docs/images/logos/v.png';
});

watch(route, () => {
  if(hasError.value) clear();
})

</script>

<template>
  <section class="error-section py-10 pt-15">
    <div class="container error">
      <VEmptyState
          :headline="error?.headline"
          :title="error?.title"
          :text="error?.text"
          :image="computedImage"
      ></VEmptyState>
      <div class="mt-2 d-flex justify-center">
        <VBtn
            v-if="error.status === 404"
            variant="outlined"
            color="primary"
            rounded="xl"
            class="error-btn"
            :to="{name: 'products'}"
        >
          Bosh sahifaga qaytish
        </VBtn>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .error{
    &-btn{
      min-width: 25%;
    }
  }
</style>
