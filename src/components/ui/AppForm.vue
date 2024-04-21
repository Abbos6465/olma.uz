<script setup lang="ts">
import {onMounted, type Ref, ref, watch} from "vue";

const appForm:Ref<HTMLFormElement> = ref();

export interface ValidationType {
  validate?: Function,
  clearValidate?: Function,
  clearForm?: Function
}

const validation = defineModel<ValidationType>('validation');

const validate = async () => {
  const {valid} = await appForm.value.validate();
  return valid;
}

const clearValidate = () => {
  return appForm.value.resetValidation();
}

const clearForm = () => {
  return appForm.value.reset();
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

<style scoped lang="scss">

</style>
