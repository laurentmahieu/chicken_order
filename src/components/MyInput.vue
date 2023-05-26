<template>
  <div class="myInput">
    <label for="name">{{ label }}</label>

    <input :type="type" name="name" required v-model="modelValue" />
  </div>
  <p></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyInput",

  props: {
    label: String,
    type: { String, default: "number" },
  },

  data() {
    return {
      modelValue: "",
    };
  },
});
</script>

<style scoped>
label {
  color: aliceblue;
}
input {
  border: 1px solid aliceblue;
  border-radius: 5px;
  padding: 10px;
  background-color: black;
  color: aliceblue;
}

input:focus {
  border: 1px solid orange;
}
.myInput {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px;
}
</style>
