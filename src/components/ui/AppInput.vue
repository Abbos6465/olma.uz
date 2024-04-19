<script setup lang="ts">
import {generateRandomID} from "@/utils/helper";
import {computed, ref, type Ref, useSlots} from "vue";
import {vMaska} from "maska";

type ValueType = string | number;

interface Props {
  type?: string,
  required?: boolean,
  mask?: string,
  label?:string,
  placeholder?: string,
  disabled?:boolean,
  readonly?:boolean,
  value?: ValueType,
  density?: 'compact' | 'comfortable',
  icon?: string,
  suffix?: string
}

const model = defineModel<ValueType>();

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  density: 'compact'
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
  if(props.type !== 'password') return
  showPassword.value = !showPassword.value;
}

const appendIcon = computed<string>(() => {
  if(props.type !== 'password') return ''
  return showPassword.value ? 'mdi-eye-off' : 'mdi-eye'
});

const rules = computed(() => {

})

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
      <span
        v-if="required"
      >
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
      :type="computedType"
      color="primary"
      :prepend-inner-icon="icon"
      :append-inner-icon="appendIcon"
      @click:append-inner="appendInnerClick"
      class="app-input__input"
    >
    </VTextField>
  </div>
</template>

<style lang="scss">
  .app-input{
    &__input{
      .v-input{
        //&__details{
        //  padding-inline: 0;
        //  padding: 0;
        //  min-height: unset;
        //}
      }
    }
  }
</style>