<script setup lang="ts">
import {generateRandomID} from "@/utils/helper";
import {computed, ref, useSlots} from "vue";
import type {FormRulesVType} from "@/components/ui/forms/form.types";
import useToast from "@/components/ui/app-toast/useToast";
import AppProgressCircular from "@/components/ui/AppProgressCircular.vue";

const {toast} = useToast();

const randomId = generateRandomID();

interface PropsType {
  value?: string
  placeholder?: string,
  label?: string,
  uploadFunction?: (file: File) => Promise<void>,
  required?: boolean,
  disabled?: boolean,
  readonly?: boolean,
}

const props = defineProps<PropsType>();

const emit = defineEmits<{
  (event: 'clear'): void;
}>();

const slots = useSlots();


type RulesType = (v: FormRulesVType) => boolean | string;

const computedRules = computed<RulesType[]>(() => {
  const rules: RulesType[] = [];

  if (props.required) {
    rules.push(
        (v: RulesType) => !!v || "To'ldirish majburiy maydon"
    )
  }

  return rules;
});

const avatar = ref<string | ArrayBuffer | null>(null);
const isLoading = ref<boolean>(false);

const uploadImage = async (event: InputEvent) => {
  console.log("AAA");
  const input = event.target as HTMLInputElement;
  if (!(input.files && input.files[0])) return
  const file: File = input.files[0];
  console.log(file)
  readImage(file);

  if (props.uploadFunction) {
    isLoading.value = true;

    try {
      await props.uploadFunction(file);
    } catch (error) {
      avatar.value = null;
      toast.error({text: error});
    } finally {
      isLoading.value = false;
    }
  }
};

const readImage = async (file: File) => {
  if (file instanceof File) {
    const reader = new FileReader();

    avatar.value = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
};

const clear = () => {
  avatar.value = null;
  emit("clear");
}

</script>

<template>
  <div class="avatar-uploader app-form__item pb-4">
    <label
        v-if="slots.label || label"
        :for="randomId"
        class="app-form__item__label"
    >
      <slot
          v-if="slots.label"
          name="label"
      />
      <template v-else>
        {{ label }}
      </template>
      <span v-if="required">
        *
      </span>
    </label>
    <VFileInput
        :id="randomId"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rules="computedRules"
        class="m-0 p-0 w-0 h-0 opacity-0"
        accept="image/png, image/jpg"
        @change="uploadImage"
    />
    <div
        v-if="avatar"
        size="190"
        class="avatar-uploader__handler  position-relative rounded d-flex align-center justify-center"
    >
      <AppProgressCircular
          v-if="isLoading"
          :size="40"
          :width="3"
      />
      <VAvatar
          color="grey"
          rounded
          size="190"
          class="avatar-uploader__avatar"
          :image="avatar as string"
      />
      <VBtn
          @click="clear"
          icon="mdi-close"
          size="28"
          density="compact"
          class="position-absolute avatar-uploader__close"
      />
    </div>
  </div>
</template>

<style lang="scss">
.avatar-uploader {
  &__handler {
    outline: 2px dashed #C5D0DD;
  }

  &__avatar, &__handler {
    width: 190px;
    height: 190px;
  }

  &__close{
    right: -10px;
    top: -10px;
  }
}
</style>
