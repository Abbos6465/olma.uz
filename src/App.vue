<script setup lang="ts">
  import {onMounted} from "vue";
  import {useAuthStore} from "@/stores/auth.store";
  import AppToast from "@/components/ui/app-toast/AppToast.vue";

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.me();
  });
</script>

<template>
  <AppToast/>
  <VLayout class="d-block layout">
    <RouterView />
  </VLayout>
</template>
