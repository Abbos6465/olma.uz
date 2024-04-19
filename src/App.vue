<template>
  <RouterView name="Header" />
  <RouterView :key="$route.path" />
  <RouterView name="Footer"/>
</template>