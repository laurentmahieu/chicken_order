<template>
  <button
    :style="`border: 1px solid ${color}; color: ${color}; background-color: ${bgColor};`"
  >
    {{ msg }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyButton",

  props: {
    msg: String,
    color: { String, default: "navy" },
    bgColor: { String, default: "aliceblue" },
  },
});
</script>

<style scoped>
button {
  width: 120px;
  margin: 10px;
  padding: 10px;
  text-transform: uppercase;
  border: none;
  border-radius: 10px;
  border: 1px solid navy;
  color: navy;
}
</style>
