<script setup lang="ts">
  import {onMounted} from "vue";
  import {useAuthStore} from "@/stores/auth.store";

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.me();
  });
</script>

<template>
  <RouterView name="Header" />
  <RouterView :key="$route.path" />
  <RouterView name="Footer"/>
</template>
