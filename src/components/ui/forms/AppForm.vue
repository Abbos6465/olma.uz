<script setup lang="ts">
import {onMounted, ref} from "vue";

const appForm = ref<HTMLFormElement | null>(null);

export interface ValidationType {
  validate?: () => Promise<boolean>,
  clearValidate?: ()=> void,
  clearForm?: () => void
}

const validation = defineModel<ValidationType>('validation', {
  default: {}
});

const validate = async (): Promise<boolean> => {
  if (!appForm.value) return false;
  
  const {valid} = await appForm.value?.validate();
  return valid;
}

const clearValidate = () => {
  appForm.value?.resetValidation();
}

const clearForm = () => {
  appForm.value?.reset();
}

onMounted(() => {
  Object.assign(validation.value, {
    validate,
    clearValidate,
    clearForm
  });
});

</script>

<template>
  <VForm
      ref="appForm"
      class="app-form"
  >
    <slot/>
  </VForm>
</template>
