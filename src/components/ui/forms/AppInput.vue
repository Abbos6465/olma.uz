<script setup lang="ts">
import {generateRandomID} from "@/utils/helper";
import {computed, ref, type Ref, useSlots} from "vue";
import {vMaska} from "maska";
import type {FormItemType, FormRulesType, FormRulesVType} from "@/components/ui/forms/form.types";

type ValueType = string | number;

interface PropsType extends FormItemType {
  type?: string,
  mask?: string,
  value?: ValueType,
  icon?: string,
  appendIcon?: string,
  min?: number,
  appendClickFunction?: Function
}

const model = defineModel<ValueType>();

const props = withDefaults(defineProps<PropsType>(), {
  type: 'text',
  density: 'compact',
  color: 'primary',
});

const randomId:string = generateRandomID();
const slots = useSlots();

const computedMask = computed(() => {
  return {mask: props.mask}
});

const showPassword: Ref<boolean> = ref(false);

const computedType = computed(() => {
  if(props.type !== 'password') return props.type;
  return showPassword.value ? 'text' : 'password';
});

const appendInnerClick = () => {
  if(props.type !== 'password' && props.appendClickFunction) return props.appendClickFunction();
  showPassword.value = !showPassword.value;
}

const computedAppendIcon = computed<string>(() => {
  if(props.type !== 'password' && props.appendIcon) return props.appendIcon;
  return showPassword.value ? 'mdi-eye-off' : 'mdi-eye'
});

const computedRules = computed<FormRulesType>(() => {
  const rules:FormRulesType = [];
  if(props.required){
    rules.push(
        (v: FormRulesVType) => (props.type === 'text' && typeof (v) === 'string') ? !!v?.trim() : !!v || "To'ldirish majburiy maydon"
    )
  }
  if(props.type === 'email'){
    rules.push(
        (v: FormRulesVType) =>  checkEmail(v) || "Noto'g'ri elektron pochta manzili"
    )
  }

  if (!!props.min){
    rules.push(
        (v: FormRulesVType) => {
          if (typeof v === 'string') return v.length >= props.min || `Maydon kamida ${props.min} ta belgidan iborat bo'lishi kerak`;
          else return v >= props.min || `Son kamida ${props.min} shu songa teng bo'lishi kerak`;
        }
    );
  }

  return rules;
});

const checkEmail = (value?: FormRulesVType): boolean => {
  if (!value || (value && typeof(value) === 'string')) return false;
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value?.trim());
}

const keyupEnterEvent = () => {
  if(props.appendClickFunction) appendInnerClick();
}

</script>

<template>
  <div class="app-input app-form__item">
    <label
        v-if="slots.label || label"
        :for="randomId"
        class="app-input__label app-form__item__label"
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
    <VTextField
      v-model="model"
      v-maska:[computedMask]
      :id="randomId"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      variant="outlined"
      :density="density"
      :rounded="rounded"
      :type="computedType"
      :color="color"
      :prepend-inner-icon="icon"
      :append-inner-icon="computedAppendIcon"
      @click:append-inner="appendInnerClick"
      @keyup.enter="keyupEnterEvent"
      :rules="computedRules"
      :hint="hint?.text"
      :persistent-hint="!!hint"
      :error="hint?.status === 'danger'"
      :clearable="clearable"
      class="app-input__input"
    >
    </VTextField>
  </div>
</template>

<style lang="scss">
  .app-input{
    &__input{
      .v-input{
        &__details{
          padding-inline: 0;
          padding: 0;
          min-height: unset;
        }
      }

      .v-messages{
        &__message{
          padding: 5px 0 12px;
        }
      }
    }
  }
</style>
