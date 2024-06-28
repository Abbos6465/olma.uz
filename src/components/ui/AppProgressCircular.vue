<script setup lang="ts">
interface PropsType {
  color?: string,
  size?: number,
  indeterminate?: boolean,
  width?: number,
  rotate?: number
}

const model = defineModel<number>();

const props = withDefaults(defineProps<PropsType>(), {
  color: 'primary',
  indeterminate: true,
  width: 5,
  size: 70,
})

</script>

<template>
  <div class="app-progress-circular d-flex align-center justify-center">
    <VProgressCircular
        v-model="model"
        :indeterminate="indeterminate"
        :size="size"
        :width="width"
        :color="color"
        :rotate="rotate"
    />
  </div>
</template>
