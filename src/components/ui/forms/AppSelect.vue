<script setup lang="ts">
import type {FormItemType, FormRulesType, FormRulesVType} from "@/components/ui/forms/form.types";
import {generateRandomID} from "@/utils/helper";
import {computed, useSlots, watch} from "vue";

const randomId:string = generateRandomID();

type ValueType = string | number | null | undefined | (string | number)[] | {};

interface PropsType extends FormItemType {
  value?: ValueType;
  multiple?: boolean,
  chips?: boolean,
  items?: (string | number | {})[],
  itemTitle?: string,
  itemValue?: string,
}

const model = defineModel<ValueType>();

const emit = defineEmits<{
  change: [value: ValueType]
}>();

const props = withDefaults(defineProps<PropsType>(),{
  density: 'compact',
  color: 'primary',
  placeholder: "Tanlang"
});

const slots = useSlots();

type RulesType = (v: FormRulesVType) => boolean | string;

const computedRules = computed<RulesType[]>(() => {
  const rules: RulesType[] = [];

  if (props.required) {
    rules.push(
        (v: RulesType) => {
          if (v && typeof v === 'object') {
            return !!Object.keys(v).length || "To'ldirish majburiy maydon";
          }
          return !!v || "To'ldirish majburiy maydon";
        }
    )
  }

  return rules;
});

watch(model, (newValue) => {
  emit("change", newValue);
})

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
      :items="items"
      :item-value="itemValue"
      :item-title="itemTitle"
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
