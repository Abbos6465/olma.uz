<script setup lang="ts">
interface Props {
  lastPage?: number,
}

const page = defineModel({
  type: Number,
  default: 1,
});

const props = defineProps<Props>();

</script>

<template>
  <div
      v-show="lastPage>1"
      class="text-center my-4"
  >
    <div class="container mx-auto">
      <VPagination
          v-model="page"
          :length="lastPage"
          rounded="circle"
      >
      </VPagination>
    </div>
  </div>
</template>
