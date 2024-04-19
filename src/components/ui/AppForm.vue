<script setup lang="ts">
import {type Ref, ref} from "vue";

const appForm:Ref<HTMLFormElement> = ref();
</script>

<template>
  <VForm
      ref="appForm"
      class="app-form"
      @submit.prevent
  >
    <slot/>
  </VForm>
</template>

<style scoped lang="scss">

</style>