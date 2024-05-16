<script setup lang="ts">
import {ref} from "vue";

const drawerOpen = ref<boolean>(false);


</script>

<template>
  <VAppBar
      color="primary"
      prominent
  >
    <VAppBarNavIcon
        size="large"
        variant="text"
        @click="drawerOpen = !drawerOpen"
    />

    <RouterLink
        :to="{name: 'products'}"
        class="font-weight-bold text-decoration-none text-white"
    >
        Olma.uz
    </RouterLink>
    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template>

    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
  </VAppBar>
  <v-navigation-drawer
      v-model="drawerOpen"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
  >
    <v-list>
    </v-list>
  </v-navigation-drawer>
</template>
