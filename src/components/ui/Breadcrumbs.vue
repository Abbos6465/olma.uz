<script setup lang="ts">
  export interface BreadcrumbsItemType{
    title: string,
    href?: string | object,
    disabled?: boolean,
  }

  interface PropsType {
    items: BreadcrumbsItemType[];
  }

  const props = defineProps<PropsType>();

</script>

<template>
  <VBreadcrumbs class="container">
    <VBreadcrumbsItem
        :to="{name: 'products'}"
        title="Bosh sahifa"
    />
    <template
        v-for="item in items"
        :key="item.title"
    >
     <VBreadcrumbsDivider title="/" />
    <VBreadcrumbsItem
        :to="item.href"
        :disabled="item.disabled"
    >
       {{ item.title }}
    </VBreadcrumbsItem>
    </template>
  </VBreadcrumbs>
</template>

<style lang="scss">

</style>
