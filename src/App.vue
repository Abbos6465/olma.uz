<script setup lang="ts">
import {onMounted} from "vue";
import AppError from "@/components/ui/app-error/AppError.vue";
import {useAuthStore} from "@/stores/auth.store";
import AppToast from "@/components/ui/app-toast/AppToast.vue";
import {getAccessToken} from "@/utils/local.storage";
import useError from "@/components/ui/app-error/useError";

const {hasError} = useError();

const authStore = useAuthStore();

  onMounted(() => {
    if (getAccessToken()) authStore.me();
  });

</script>

<template>
  <AppToast/>
  <AppError v-if="hasError"/>
  <VLayout
      v-else
      class="d-block layout"
  >
    <RouterView/>
  </VLayout>
</template>
