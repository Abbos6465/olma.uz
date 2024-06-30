<script setup lang="ts">
import type {FormItemType, FormRulesType, FormRulesVType} from "@/components/ui/forms/form.types";
import {generateRandomID} from "@/utils/helper";
import {computed, useSlots} from "vue";

const randomId:string = generateRandomID();

type ValueType = string;

const model = defineModel<ValueType>();

interface PropsType extends FormItemType{
  rows?: number,
  value?: ValueType,
  icon?: string,
  appendIcon?: string,
}

const props = withDefaults(defineProps<PropsType>(), {
  rows: 2,
  density: 'compact',
  color: 'primary',
});

const slots = useSlots();

const computedRules = computed<FormRulesType>(() => {
  const rules:FormRulesType = [];

  if (props.required){
    rules.push(
        (v: string) => !!v || "To'ldirish majburiy"
    )
  }

  return rules;
})

</script>

<template>
  <div class="app-textarea app-form__item">
    <label
        v-if="slots.label || label"
        :for="randomId"
        class="app-textarea__label app-form__item__label"
    >
      <slot
          v-if="slots.label"
          name="label"
      />
      <template v-if="label">
        {{ label }}
      </template>
      <span v-if="required">
        *
      </span>
    </label>
    <VTextarea
      v-model="model"
      :id="randomId"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :rules="computedRules"
      variant="outlined"
      :density="density"
      :rounded="rounded"
      :color="color"
      :prepend-inner-icon="icon"
      :append-inner-icon="appendIcon"
      class="app-textarea__textarea w-100"
    />
  </div>
</template>

<style lang="scss">

</style>
