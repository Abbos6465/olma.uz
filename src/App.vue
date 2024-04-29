<script setup lang="ts">
  import {onMounted} from "vue";
  import {useAuthStore} from "@/stores/auth.store";
  import useToast from "@/components/ui/app-toast/useToast";

  const authStore = useAuthStore();
  const {toast} = useToast();

  onMounted(() => {
    authStore.me();
    toast.success({
      text: "Salom",
      duration: 1000
    })
  });
</script>

<template>
  <RouterView name="Header" />
  <RouterView :key="$route.path" />
  <RouterView name="Footer"/>
</template>
