<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@media screen and (min-aspect-ratio: 13/9) {
  html {
    transform: rotate(-90deg);
    transform-origin: left top;
    width: 100vh;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .bw-dashboard {
    height: inherit;
  }
}
@media screen and (min-width: 1292px) {
  html {
    transform: none;
    transform-origin: none;
    width: 100%;
    overflow-x: none;
    position: relative;
  }
  .bw-dashboard {
    height: 100vh;
  }
}
</style>
