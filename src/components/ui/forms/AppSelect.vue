<script setup lang="ts">
import type {FormItemType, FormRulesType, FormRulesVType} from "@/components/ui/forms/form.types";
import {generateRandomID} from "@/utils/helper";
import {computed, useSlots} from "vue";

const randomId:string = generateRandomID();

type ValueType = string | number | (string | number)[] | {};

interface PropsType extends FormItemType {
  value?: ValueType;
  multiple?: boolean,
  chips?: boolean,
  items?: (string | number | {})[],
  itemTitle?: string,
  itemValue?: string,
}

const model = defineModel<ValueType>();

const props = withDefaults(defineProps<PropsType>(),{
  density: 'compact',
  color: 'primary',
});

const slots = useSlots();

const computedRules = computed<FormRulesType>(() => {
  const rules: FormRulesType = [];

  if (props.required) {
    rules.push(
        (v: FormRulesVType & {}) => typeof(v) === 'object' ? !!Object.keys(v).length : !!v || "To'ldirish majburiy maydon"
    )
  }

  return rules;
});

</script>

<template>
  <div class="app-select app-form__item">
    <label
        v-if="slots.label || label"
        :for="randomId"
        class="app-select__label app-form__item__label"
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
    <VSelect
      v-model="model"
      :id="randomId"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rules="computedRules"
      :required="required"
      variant="outlined"
      :density="density"
      :rounded="rounded"
      :color="color"
      :hint="hint?.text"
      :persistent-hint="!!hint"
      :error="hint?.status === 'danger'"
      :clearable="clearable"
      class="app-select__select"
    />
  </div>
</template>

<style lang="scss">

</style>
