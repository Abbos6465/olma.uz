<script setup lang="ts">
import {type Ref, ref} from "vue";

  const loading:Ref<boolean> = ref(false);

  const onClick = () => {
    loading.value = true;

    setTimeout(()=>{
      loading.value = false;
    },2000)
  }

</script>

<template>
  <v-card
      class="mx-auto"
      color="grey-lighten-3"
      max-width="400"
  >
    <v-card-text>
      <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="comfortable"
          label="Search templates"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">

</style>