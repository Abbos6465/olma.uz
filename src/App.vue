<script setup lang="ts">
  import {onMounted} from "vue";
  import {useAuthStore} from "@/stores/auth.store";
  import useToast from "@/components/ui/app-toast/useToast";
  import AppToast from "@/components/ui/app-toast/AppToast.vue";

  const authStore = useAuthStore();
  const {toast} = useToast();

  onMounted(() => {
    authStore.me();
  });
</script>

<template>
  <AppToast/>
  <RouterView :key="$route.path" />
</template>
